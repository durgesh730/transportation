import React from 'react'

const Vehicle = ({ data, setData, setUploaddoc, setVehicle }) => {

    const setVal = (e) => {
        const { value, name } = e.target;

        setData(() => {
            return {
                ...data,
                [name]: value
            }
        })
    }

    const fun = (e) => {
        e.preventDefault()
        if (data.basefare === '' || data.lodingCapacity === '' || data.transName === '' || data.Vnamber === "" || data.RCnumber === "") {
            alert("fill all details")
            setUploaddoc(false);
            setVehicle(true);
        } else {
            setUploaddoc(true);
            setVehicle(false);
            alert("Your Data Save successfully")
        }
    }

    return (
        <>
            <div className='profileDriver' >
                <h6>Vehicle Details </h6>
                <small>Let us know about you to suggest the best for you.</small>

                <form>
                    <div class="form-group">
                        <input type="basefare" name='basefare' value={data.basefare} class="form-control" id="basefare" aria-describedby="emailHelp" placeholder="Base Fare(Rent)" onChange={setVal} />
                    </div>
                    <div class="form-group">
                        <input type="lodingCapacity" name='lodingCapacity' value={data.lodingCapacity} class="form-control" id="lodingCapacity" placeholder="Loding Capacity" onChange={setVal} />
                    </div>

                    <div class="form-group">
                        <input type="bodysize" name='bodysize' value={data.bodysize} class="form-control" id="email" aria-describedby="emailHelp" placeholder="Load Body Size" onChange={setVal} />
                    </div>
                    <div class="form-group">
                        <input type="tarnsName" name='transName' value={data.transName} class="form-control" id="tarnsName" placeholder="Your Transportation Name" onChange={setVal} />
                    </div>

                    <div class="form-group">
                        <input type="vNumber" name='Vnamber' value={data.Vnamber} class="form-control" id="vNumber" aria-describedby="emailHelp" placeholder="Vehile Number" onChange={setVal} />
                    </div>
                    <div class="form-group">
                        <input type="DLnumber" name='DLnumber' value={data.DLnumber} class="form-control" id="DLnumber" placeholder="Driving License Number" onChange={setVal} />
                    </div>

                    <div class="form-group">
                        <input type="Rcnumber" name='RCnumber' value={data.RCnumber} class="form-control" id="Rcnumber" placeholder="RC Number" onChange={setVal} />
                    </div>

                    <div className='my-2' >
                        <label class="form-check-label" for="flexRadioDefault1">You have Polution Certificate</label>
                        <div class="form-check">
                            <input class="form-check-input" name='Polutioncertificate' value={data.PolutionCertificate} type="radio" id="1" onChange={setVal} />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name='Polutioncertificate' value={data.PolutionCertificate} id="2" checked onChange={setVal} />
                            <label class="form-check-label" for="flexRadioDefault2">
                                No
                            </label>
                        </div>
                    </div>

                    <div>
                        <button type="submit" class="btn btn-profile mx-2 my-3">Cancel</button>
                        <button type="submit" class="btn btn-profile my-3" onClick={fun} >Save</button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default Vehicle
