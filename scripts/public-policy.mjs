// Return only risk categories: never include matched values in output.
export function contentRisks(text) {
  const risks = [];
  if (/[A-Z]:[\\/]/.test(text)) risks.push("local source path");
  if (
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|AKIA[A-Z0-9]{16}|sk-[A-Za-z0-9_-]{35,}|\beyJ[A-Za-z0-9_-]{12,}\.eyJ[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}/.test(
      text,
    )
  )
    risks.push("credential pattern");
  if (
    /(?:api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret|password)\s*["']?\s*[:=]\s*["'][^"'\r\n]{12,}["']/i.test(
      text,
    )
  )
    risks.push("sensitive literal assignment");
  if (
    /\b(?:10(?:\.\d{1,3}){3}|192\.168(?:\.\d{1,3}){2}|172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2})\b/.test(
      text,
    )
  )
    risks.push("private network address");
  if (
    /[?&](?:api[_-]?key|appid|access_token|auth_token)=[^&#\s"']{8,}/i.test(
      text,
    )
  )
    risks.push("credential in URL");
  return risks;
}
export const prohibitedFile =
  /\.(?:pdf|mp4|pem|key|log|pkl|pickle|pth|pt|onnx|h5|hdf5|npy|npz|sqlite|db|csv|parquet|zip|rar|ipynb)$/i;
