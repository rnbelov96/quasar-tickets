import normalizeDate from "./normalize-date"

export default (userData) => {
  return {
    ...userData,
    birthday: normalizeDate(userData.birthday),
  }
}