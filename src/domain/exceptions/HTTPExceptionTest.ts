export default class HTTPExceptionTest extends Error {
  readonly response = {
    status: 500,
    data: `Internal server error test`,
  };

  constructor() {
    super(`Network Error`);
  }
}
