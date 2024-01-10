export default (date) => {
  return new Date(Number(date)).toLocaleDateString()
}