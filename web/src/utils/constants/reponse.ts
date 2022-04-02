const commonResponse = {
  error: {
    INTERNAL_SERVER: 'Internal server error.',
    INVALID_BODY: 'The data you have provided is incorrect or insufficient.'
  }
}

const errorResponse = {
  FETCH_FILE_DATA: 'Error fetching data from JSON file.'
}

const successResponse = {
  COUNT_FILE_DATA: 'Successfully counted JSON file data.',
  FETCH_FILE_DATA: 'Successfully fetched JSON file data.'
}

const responseCode = {
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  CREATED: 201,
  FORBIDDEN: 403,
  INTERNAL_SERVER: 500,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  NOT_FOUND: 404,
  NO_CONTENT: 204,
  OK: 200,
  PARTIAL_CONTENT: 206,
  UNAUTHORIZED: 401
}

export { commonResponse, responseCode, errorResponse, successResponse }
