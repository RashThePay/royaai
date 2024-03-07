export default function Icon({name, dir, color}) {
    return (
        <i className={`m${(dir == 'ltr')? 'r' : 'l'}-2 text-lg fad fa-${name} ${color? 'text-'+color: ''}`}></i> 
    )
}