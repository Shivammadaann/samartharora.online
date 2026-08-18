export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    const url = new URL(request.url);
    if (!url.pathname.endsWith("/")) {
      url.pathname = `${url.pathname}/`;
      const directoryResponse = await env.ASSETS.fetch(new Request(url, request));
      if (directoryResponse.status !== 404) return directoryResponse;
    }

    return response;
  },
};
