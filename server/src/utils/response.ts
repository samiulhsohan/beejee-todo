import { Response } from 'express'

function createSuccessResponse(result: any) {
  return {
    success: true,
    errorMessage: null,
    result,
  }
}

function createErrorResponse(message: string) {
  return {
    success: false,
    errorMessage: message,
    result: null,
  }
}

export function sendResponse(res: Response, result: any) {
  res.json(createSuccessResponse(result))
}

export function sendServerError(res: Response) {
  res.status(500).send(createErrorResponse('Internal server error'))
}

export function sendBadRequestError(res: Response, message?: string) {
  res.status(400).send(createErrorResponse(message ?? 'Bad request'))
}

export function sendUnauthenticatedError(res: Response, message?: string) {
  res.status(401).send(createErrorResponse(message ?? 'Unauthenticated'))
}
