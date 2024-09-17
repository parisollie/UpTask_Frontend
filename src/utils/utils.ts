//Vid 523
export function formatDate(isoString: string) : string {
    //Lo convertimos a fecha y lo queremos a fecha 
    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return formatter.format(date)
}