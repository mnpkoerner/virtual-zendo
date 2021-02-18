import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import BellStart from '../BellStart/BellStart'
//delete
// import MountainZendo from '../Mountains/MountainZendo'

//need axios and use effect, axios to get total sitting
//use effect to call the get on page load?
//otherwise call the get on another timer, send results to reducer five seconds
//before this page loads, and and hold them there so this page can call them

//lets get a reducer too

export default function ZendoBegin ({attended}) {

    //for the button
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionInfo = useSelector(store=>store.zendo)

    const handleClick = () =>{
        console.log('leave room')
        //update DB that user has left?
        dispatch({type: 'UPDATE_EVENT', payload: {id: sessionInfo.id, left: true}})
        history.push('/user')
    }

    //makeArray lets me generate imgs on the screen, one for each person sitting
    function makeArray(number) {
        let array = []
        let counter = 0;
        for(let i = 0; i < number; i++){
            array.push(`cloud_${counter++}`)
        }
        console.log(array)
        return array
    }


    //div maker becomes the array I loop over to generate visual representation of people sitting
    const divmaker = makeArray(attended);

    return(
        <>
        <div className="header">
        <h3>People sitting with you: {attended}</h3>
        <button className="delete" onClick={()=>{handleClick()}}>Back to User Portal</button>
        <BellStart url={"/public/zendo/start_3_bells.mp3"} />
        </div>
        {divmaker.map((object)=>{
            return(
                <img key={object} className={object} src="/zendo/cloud_1.png" />
            )
        })}
        </>

    )
}
