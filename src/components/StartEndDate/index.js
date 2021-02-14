
export default function StartEndDate(start, end) {
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
  const t_startDate = new Date(start);
  const t_endDate = new Date(end);
  return (
    [t_startDate.getUTCDate() +" "+(meses[t_startDate.getMonth()]) +" "+t_startDate.getFullYear(),
    t_endDate.getUTCDate() +" "+(meses[t_endDate.getMonth()]) +" "+t_endDate.getFullYear()]
  )
}
