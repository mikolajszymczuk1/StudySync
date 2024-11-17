class RequestError extends Error {
  response: { error: string };

  constructor(response: { error: string }) {
    super('');
    this.response = response;

    Object.setPrototypeOf(this, RequestError.prototype);
  }
}

export default RequestError;
