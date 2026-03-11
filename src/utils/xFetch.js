export const xFetch = (() => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
  }
  return {
    setSignal(signal) {
      fetchOptions.signal = signal;
      return this;
    },
    get(url) {
      return fetch(url, {...fetchOptions, method: "GET"});
    },
    post(url, data) {
      return fetch(url, {...fetchOptions, body: JSON.stringify(data)});
    },
    compile(filename, fileFormat, data) {
      const url = `/users?action=compile&filename=${filename}&fileFormat=${fileFormat}`;
      return this.post(url, data);
    },
  }
})()