export default function() {
  const mockBaseURL = "http://localhost:3000";
  const realBaseURL = "http://note-serve.hunger-velley.com";
  const baseURL =
    process.env.NODE_ENV === "development" ? mockBaseURL : realBaseURL;
  return baseURL;
}
