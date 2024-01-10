import normalizeDate from "./normalize-date"

export default (ticket) => {
  return {
    ...ticket,
    normalizedCreationDate: normalizeDate(ticket.creationDate),
  }
}