import Link from 'next/link'
import { baseUrl } from '../utilities/utils'


function StaffList({ staff }) {
    // TODO: USE A SWITCH
    
    if(staff.length === 0){
        <>
        <p></p>
        </>
    } else if (staff.length === 1){
        return (
            <Link href={`/staff/${staff[0].slug}`}><a>{staff[0].name}</a></Link>
        )
    } else if (staff.length === 2){
        return (
            <>
                <Link href={`/staff/${staff[0].slug}`}><a>{staff[0].name}</a></Link>
                <span> & </span>
                <Link href={`/staff/${staff[1].slug}`}><a>{staff[1].name}</a></Link>
            </>
        )
    } else if (staff.length === 3){
        return (
            <>  
                <Link href={`/staff/${staff[0].slug}`}><a>{staff[0].name}</a></Link>
                <span>, </span>
                <Link href={`/staff/${staff[1].slug}`}><a>{staff[1].name}</a></Link>
                <span> & </span>
                <Link href={`/staff/${staff[2].slug}`}><a>{staff[2].name}</a></Link>
            </>
        )
    } else if (staff.length === 4) {
        return (
            <>  
                <Link href={`/staff/${staff[0].slug}`}><a>{staff[0].name}</a></Link>
                <span>, </span>
                <Link href={`/staff/${staff[1].slug}`}><a>{staff[1].name}</a></Link>
                <span>, </span>
                <Link href={`/staff/${staff[2].slug}`}><a>{staff[2].name}</a></Link>
                <span> & </span>
                <Link href={`/staff/${staff[3].slug}`}><a>{staff[3].name}</a></Link>
            </>
        )
    } else if (staff.length === 5) {
        return (
            <>  
                <Link href={`/staff/${staff[0].slug}`}><a>{staff[0].name}</a></Link>
                <span>, </span>
                <Link href={`/staff/${staff[1].slug}`}><a>{staff[1].name}</a></Link>
                <span>, </span>
                <Link href={`/staff/${staff[2].slug}`}><a>{staff[2].name}</a></Link>
                <span>, </span>
                <Link href={`/staff/${staff[3].slug}`}><a>{staff[3].name}</a></Link>
                <span> & </span>
                <Link href={`/staff/${staff[4].slug}`}><a>{staff[4].name}</a></Link>
            </>
        )
    } else if (staff.length === 6) {
        return (
            <>  
                <Link href={`/staff/${staff[0].slug}`}><a>{staff[0].name}</a></Link>
                <span>, </span>
                <Link href={`/staff/${staff[1].slug}`}><a>{staff[1].name}</a></Link>
                <span>, </span>
                <Link href={`/staff/${staff[2].slug}`}><a>{staff[2].name}</a></Link>
                <span>, </span>
                <Link href={`/staff/${staff[3].slug}`}><a>{staff[3].name}</a></Link>
                <span>, </span>
                <Link href={`/staff/${staff[4].slug}`}><a>{staff[4].name}</a></Link>
                <span> & </span>
                <Link href={`/staff/${staff[5].slug}`}><a>{staff[5].name}</a></Link>
            </>
        )
    }
  }
  
  export default StaffList;