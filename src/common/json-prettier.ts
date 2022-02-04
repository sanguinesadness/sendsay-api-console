export const prettyJSON = (json: string): string | null => {
  if (typeof json === "object" && json !== null) {
    const pretty = JSON.stringify(json, undefined, 4);
    return pretty;
  }

  try {
    const obj = JSON.parse(json);
    return prettyJSON(obj);
  } catch (e) {
    return null;
  }
};
