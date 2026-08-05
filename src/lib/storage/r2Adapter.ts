import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import type { CollectionConfig, FileData, PayloadRequest, TypeWithID, UploadCollectionSlug } from 'payload'
import type {
  Adapter,
  File,
  GenerateURL,
  GeneratedAdapter,
  HandleDelete,
  HandleUpload,
  StaticHandler,
} from '@payloadcms/plugin-cloud-storage/types'

function getR2Config() {
  return {
    accountId: process.env.R2_ACCOUNT_ID || '',
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    bucket: process.env.R2_BUCKET_NAME || '',
    publicUrl: process.env.R2_PUBLIC_URL || '',
  }
}

let client: S3Client | undefined

function getClient(): S3Client {
  if (!client) {
    const { accountId, accessKeyId, secretAccessKey } = getR2Config()
    client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })
  }
  return client
}

export function r2Adapter(): Adapter {
  return (): GeneratedAdapter => {
    const { bucket, publicUrl } = getR2Config()

    const generateURL: GenerateURL = ({ data, filename }: { data: Record<string, unknown>; filename: string; prefix?: string }) => {
      const filenameStr = (data as Record<string, string>)._filename || ''
      const folder = filenameStr.split('/').slice(0, -1).join('/')
      return `${publicUrl}/${folder ? folder + '/' : ''}${filename}`
    }

    const handleUpload: HandleUpload = async ({
      data,
      file,
    }: {
      clientUploadContext: unknown
      collection: CollectionConfig
      data: Record<string, unknown>
      file: File
      req: PayloadRequest
    }): Promise<Partial<FileData & TypeWithID>> => {
      const s3 = getClient()
      const filename = (data as Record<string, string>)._filename || file.filename
      const key = filename

      await s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimeType,
          ContentLength: file.filesize,
        }),
      )

      return {
        ...data,
        _filename: key,
        url: `${publicUrl}/${key}`,
      } as Partial<FileData & TypeWithID>
    }

    const handleDelete: HandleDelete = async ({
      doc,
    }: {
      collection: CollectionConfig
      doc: FileData & TypeWithID & { prefix?: string; _filename?: string; filename?: string }
      filename: string
      req: PayloadRequest
    }): Promise<void> => {
      const s3 = getClient()
      const key = doc._filename || doc.filename
      if (!key) return

      await s3.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: key,
        }),
      )
    }

    const staticHandler: StaticHandler = async (
      _req: PayloadRequest,
      args: {
        doc?: TypeWithID
        headers?: Headers
        params: {
          clientUploadContext?: unknown
          collection: string
          filename: string
          prefix?: string
        }
      },
    ): Promise<Response> => {
      const key = args.params.filename
      const url = `${publicUrl}/${key}`
      return Response.redirect(url, 302)
    }

    return {
      name: 'r2',
      generateURL,
      handleUpload,
      handleDelete,
      staticHandler,
    }
  }
}

export const r2StorageCollectionSlug: UploadCollectionSlug = 'media'