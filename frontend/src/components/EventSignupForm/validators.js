export const required = v => (v ? undefined : "Field is required");
export const email = v =>
  (v && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(v)
    ? undefined
    : "Invalid email address");
