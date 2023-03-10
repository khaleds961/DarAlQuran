import React, { useState, useContext, useEffect, KeyboardEventHandler } from 'react'
import Swal from 'sweetalert2'
import Api from '../Api'
import SessionContext from '../session/SessionContext';
import CenterSelect from './CenterSelect';
import TeacherSelect from './TeacherSelect';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CreatableSelect from 'react-select/creatable';
import { NavLink, useParams } from 'react-router-dom';



export default function AddStudentForm() {

    const { id } = useParams()

    const { session: { user: { role_id } } } = useContext(SessionContext);
    const { session: { user: { centers } } } = useContext(SessionContext);
    const defaultvalue = role_id === 3 || role_id === 4 ? centers[0]['center_id'] : 0;

    const arraybloodtypes = [
        { 'id': 1, 'value': 'A+' },
        { 'id': 2, 'value': 'A-' },
        { 'id': 3, 'value': 'B+' },
        { 'id': 4, 'value': 'B-' },
        { 'id': 5, 'value': 'AB-' },
        { 'id': 6, 'value': 'AB+' },
        { 'id': 7, 'value': 'O+' },
        { 'id': 8, 'value': 'O-' }
    ]

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [middle_name, setMiddle_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [phone_number, setPhone_number] = useState('')
    const [mothername, setmothername] = useState('')
    const [placeofbirth, setplaceofbirth] = useState('')
    const [birthday, setbirthday] = useState('')
    const [martialstatus, setmartialstatus] = useState('single')
    const [schooluni, setschooluni] = useState('')
    const [major, setmajor] = useState('')
    const [rate, setrate] = useState('')
    const [bloodtype, setbloodtype] = useState('A+')
    const [gender, setgender] = useState('male')
    const [nationality, setnationality] = useState('')
    const [current_job, setcurrent_job] = useState('')
    const [motherjob, setmotherjob] = useState('')
    const [fatherjob, setfatherjob] = useState('')
    const [fatherphonenumber, setfatherphonenumber] = useState('')
    const [motherphonenumber, setmotherphonenumber] = useState('')
    const [address, setaddress] = useState('')
    const [work_number, setwork_number] = useState('')
    const [home_number, sethome_number] = useState('')
    const [student_level_status, setstudent_level_status] = useState('beginner')
    const [reading_level, setreading_level] = useState('tilawa')
    const [female_question, setfemale_question] = useState(0)
    const [memorizing, setmemorizing] = useState('')
    const [center_id, setCenter_id] = useState(defaultvalue)
    const [teachers, setTeachers] = useState([])
    const [teacher_id, setTeacher_id] = useState(0)
    const [suitabledays, setsuitablesdays] = useState([])
    const [suitabletimes, setsuitablestimes] = useState([])
    const [student_isring, setstudent_isring] = useState('no')
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState([]);
    const [rings, setrings] = useState([])
    const [ringid, setringid] = useState(0)
    const [notes, setnotes] = useState('')
    const theme = useTheme();


    const getringsbycenter = () => {
        setrings([])
        setringid(0)
        Api.get(`getringsbycenter/${center_id}`).
            then((res) => setrings(res.data.data)).catch(function (err) {
                console.log(err)
            })
    }
    const geteditteacherid = (t_id) => {
        setTeacher_id(t_id)
    }
    useEffect(() => {
        if (center_id !== 0) {
            getTeachersByCenter()
            getringsbycenter()
        }
    }, [center_id])

    useEffect(() => {
        console.log(id)
        if (id === '1') {
            setstudent_isring('yes')
        } else {
            setstudent_isring('no')
        }
    })

    const components = {
        DropdownIndicator: null,
    };


    const createOption = (label) => (
        {
            label,
            value: label,
        }
    );

    const handleKeyDown = (event) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setValue((prev) => [...prev, createOption(inputValue)]);
                setInputValue('');
                event.preventDefault();
        }
    };

    const getTeachersByCenter = () => {
        setTeachers([])
        setTeacher_id(0)
        Api.get(`getAllTeachersByCenter/${center_id}`).then((res) => {
            setTeachers(res.data.data);
        })
    }

    const addringstudent = (e) => {
        e.preventDefault();
        const skills_arr = []
        value.map(v => skills_arr.push(v.value))
        Api.post('addstudent', {
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            mother_name: mothername,
            mother_work: motherjob,
            father_work: fatherjob,
            birthdate: birthday,
            school_uni_name: schooluni,
            major: major,
            rate: rate,
            gender: gender,
            nationality: nationality,
            phone_number: phone_number,
            father_number: fatherphonenumber,
            mother_number: motherphonenumber,
            center_id: center_id,
            ring_id: ringid,
            notes: notes,
            address: address,
            skills: skills_arr.toString(),
            memorizing: memorizing,
            is_ring: 1
        }).then(
            (res) => {
                Swal.fire(res.data.message, '', 'success')
                setFirst_name('')
                setMiddle_name('')
                setLast_name('')
                setmothername('')
                setnationality('')
                setgender('male')
                setaddress('')
                setPhone_number('')
                setmotherphonenumber('')
                setfatherphonenumber('')
                setschooluni('')
                setmajor('')
                setbirthday('')
                setValue([])
                setmemorizing('')
                setnotes('')
                setmotherjob('')
                setfatherjob('')
                setrate('')
                setringid(0)
                setCenter_id(0)
            }
        ).catch(function (error) {
            console.log(error)
        })
    }
    const getcenterid = (id) => {
        setCenter_id(id)
    }
    const getteacherid = (id) => {
        setTeacher_id(id)
    }
    const addstudent = (e) => {
        e.preventDefault();
        const sheikh_names_arr = []
        value.map(v => sheikh_names_arr.push(v.value))
        Api.post('addstudent', {
            username: username,
            password: password,
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            mother_name: mothername,
            place_of_birth: placeofbirth,
            birthdate: birthday,
            marital_status: martialstatus,
            reading_level: reading_level,
            school_uni_name: schooluni,
            major: major,
            blood_type: bloodtype,
            gender: gender,
            nationality: nationality,
            current_job: current_job,
            phone_number: phone_number,
            work_number: work_number,
            home_number: home_number,
            student_level_status: student_level_status,
            center_id: center_id,
            teacher_id: teacher_id !== 0 ? teacher_id : null,
            address: address,
            suitable_times: suitabletimes.toString(),
            suitable_days: suitabledays.toString(),
            sheikh_names: sheikh_names_arr.toString(),
            memorizing: memorizing,
            female_question: female_question,
        }).then(
            (res) => {
                Swal.fire(res.data.message, '', 'success')
                setUsername('')
                setPassword('')
                setFirst_name('')
                setMiddle_name('')
                setLast_name('')
                setmothername('')
                setnationality('')
                setgender('male')
                setaddress('')
                setPhone_number('')
                setwork_number('')
                sethome_number('')
                setcurrent_job('')
                setschooluni('')
                setmajor('')
                setbirthday('')
                setplaceofbirth('')
                setreading_level('tilawa')
                setstudent_level_status('beginner')
                setbloodtype('A+')
                setmartialstatus('single')
                setsuitablesdays([])
                setsuitablestimes([])
                setValue([])
                setmemorizing('')
                female_question(0)
                setCenter_id(0)
                setTeacher_id(0)
            }
        ).catch(function (error) {
            console.log(error)
        })
    }
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setsuitablesdays(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    const handleChangeTime = (event) => {
        const {
            target: { value },
        } = event;
        setsuitablestimes(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }


    function getStyles(name, day, theme) {
        return {
            fontWeight:
                day.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const days = [
        { 'id': 1, 'value': '??????????????' },
        { 'id': 2, 'value': '????????????????' },
        { 'id': 3, 'value': '????????????????' },
        { 'id': 4, 'value': '????????????' },
        { 'id': 5, 'value': '????????????' },
        { 'id': 6, 'value': '??????????' },
    ]
    const times = [
        { 'id': 1, 'value': '4:30' },
        { 'id': 2, 'value': '5:00' },
        { 'id': 3, 'value': '5:30' },
        { 'id': 4, 'value': '6:00' },
        { 'id': 5, 'value': '6:30' },
        { 'id': 6, 'value': '7:00' },
        { 'id': 7, 'value': '7:30' },
        { 'id': 8, 'value': '8:00' },
        { 'id': 9, 'value': '8:30' },
        { 'id': 10, 'value': '9:00' },
        { 'id': 11, 'value': '10:00' },
        { 'id': 12, 'value': '10:30' },
        { 'id': 13, 'value': '11:00' },
        { 'id': 14, 'value': '11:30' },
        { 'id': 15, 'value': '12:00' },
        { 'id': 16, 'value': '12:30' },
        { 'id': 17, 'value': '13:00' },
        { 'id': 18, 'value': '13:30' },
        { 'id': 19, 'value': '14:00' },
        { 'id': 20, 'value': '14:30' },
        { 'id': 21, 'value': '15:00' },
        { 'id': 22, 'value': '15:30' },
        { 'id': 23, 'value': '16:00' },
        { 'id': 24, 'value': '16:30' },
        { 'id': 25, 'value': '17:00' },
        { 'id': 26, 'value': '17:30' },
        { 'id': 27, 'value': '18:00' },
        { 'id': 28, 'value': '18:30' },
        { 'id': 29, 'value': '19:00' },
        { 'id': 30, 'value': '19:30' },
        { 'id': 31, 'value': '20:00' },
        { 'id': 32, 'value': '20:30' },
        { 'id': 33, 'value': '21:00' },
        { 'id': 34, 'value': '21:30' },
        { 'id': 35, 'value': '22:00' },
    ]
    return (
        <>
            <div className='container' style={{ width: '80%' }}>

                {/* <div className='bg-info text-white px-4 py-2 rounded my-3'>

                    <div className="col-md d-flex justify-content-between align-items-center">
                        <span>???? ???????? ?????? ???????????? ???????? ????????????????</span>
                        <span>
                            <label className='mx-1'>??????</label>
                            <input type="radio" value='yes' name='student_isring'
                                onClick={(e) => setstudent_isring(e.target.value)} />
                        </span>
                        <span className='mx-2'>
                            <label className='mx-1'>??????</label>
                            <input type="radio"
                                defaultChecked
                                value='no'
                                name='student_isring'
                                onClick={(e) => setstudent_isring(e.target.value)} />
                        </span>
                    </div>
                </div> */}


                {/* first middle last name */}
                <div className='row'>
                    <div className="col-md">
                        <label htmlFor="f_name my-2">?????????? ??????????</label>
                        <input type="text" name='first_name' className="form-control my-2"
                            value={first_name}
                            onChange={(e) => setFirst_name(e.target.value)}
                            id="f_name" />
                    </div>

                    <div className="col-md">
                        <label htmlFor="l_name">?????????? ????????????</label>
                        <input type="text" className="form-control my-2"
                            value={middle_name}
                            onChange={(e) => setMiddle_name(e.target.value)}
                        />
                    </div>

                    <div className="col-md">
                        <label htmlFor="l_name">?????????? ????????????</label>
                        <input type="text" name='last_name' className="form-control my-2"
                            value={last_name}
                            onChange={(e) => setLast_name(e.target.value)}
                            id="l_name" />
                    </div>
                </div>


                <div className='row'>

                    <div className="col-md">
                        <label >?????? ????????</label>
                        <input type="text" className="form-control my-2"
                            value={mothername}
                            onChange={(e) => setmothername(e.target.value)}
                        />
                    </div>

                    <div className="col-md">
                        <label >??????????????</label>
                        <input type="text" className="form-control my-2"
                            value={nationality}
                            onChange={(e) => setnationality(e.target.value)}
                        />
                    </div>


                    <div className="col-md">
                        <label >??????????</label>
                        <select className="form-control my-2" value={gender}
                            onChange={(e) => setgender(e.target.value)}>
                            <option value="male">??????</option>
                            <option value="female">????????</option>
                        </select>
                    </div>

                    {student_isring === 'yes' ?
                        <>
                            <div className="col-md">
                                <label >???????? ????????</label>
                                <input type="text" className="form-control my-2"
                                    value={motherjob}
                                    onChange={(e) => setmotherjob(e.target.value)}
                                />
                            </div>

                            <div className="col-md">
                                <label >???????? ????????</label>
                                <input type="text" className="form-control my-2"
                                    value={fatherjob}
                                    onChange={(e) => setfatherjob(e.target.value)}
                                />
                            </div>
                        </>
                        : ''}
                </div>

                {student_isring === 'yes' ?
                    <>
                        <div className='row'>
                            <div className="col-md">
                                <label >???????? ????????</label>
                                <input type="text" className="form-control my-2"
                                    value={phone_number}
                                    onChange={(e) => setPhone_number(e.target.value)}
                                />
                            </div>
                            <div className="col-md">
                                <label >???????? ????????</label>
                                <input type="text" className="form-control my-2"
                                    value={motherphonenumber}
                                    onChange={(e) => setmotherphonenumber(e.target.value)}
                                />
                            </div>

                            <div className="col-md">
                                <label >???????? ????????</label>
                                <input type="text" className="form-control my-2"
                                    value={fatherphonenumber}
                                    onChange={(e) => setfatherphonenumber(e.target.value)}
                                />
                            </div>
                        </div>
                    </>
                    : ''}

                {student_isring === 'yes' ? '' :
                    gender === 'female' ?
                        <div className="col-md">
                            <label >???? ???????? ???????? ???? ?????????????? ???? ????????</label>
                            <select className="form-control my-2" value={female_question}
                                onChange={(e) => setfemale_question(e.target.value)}>
                                <option value={0}>????</option>
                                <option value={1}>??????</option>
                            </select>
                        </div>
                        : ''}


                <div className='row'>

                    <div className="col-md">
                        <label >???????? ??????????</label>
                        <input type="text" className="form-control my-2"
                            value={address}
                            onChange={(e) => setaddress(e.target.value)}
                        />
                    </div>

                    {student_isring === 'yes' ?
                        <div className="col-md">
                            <label >???????????????? ???? ????????????</label>
                            <input type="text" className="form-control my-2"
                                value={memorizing}
                                onChange={(e) => setmemorizing(e.target.value)}
                            />
                        </div> :
                        <div className="col-md">
                            <label >?????????? ????????????</label>
                            <input type="text" className="form-control my-2"
                                value={current_job}
                                onChange={(e) => setcurrent_job(e.target.value)}
                            />
                        </div>
                    }

                </div>

                <div className='row'>

                    <div className="col-md">
                        {student_isring === 'yes' ?
                            <label>??????????????</label> :
                            <label >
                                ?????????????? ???? ??????????????
                            </label>
                        }
                        <input type="text" className="form-control my-2"
                            value={schooluni}
                            onChange={(e) => setschooluni(e.target.value)}
                        />
                    </div>

                    <div className="col-md">
                        {student_isring === 'yes' ?
                            <label>????????</label>
                            :
                            <label >?????????? ?????????????? ???? ????????????</label>
                        }
                        <input type="text" className="form-control my-2"
                            value={major}
                            onChange={(e) => setmajor(e.target.value)}
                        />
                    </div>

                    {student_isring === 'yes' ?
                        <div className="col-md">
                            <label>??????????????</label>
                            <input type="text" className="form-control my-2"
                                value={rate}
                                onChange={(e) => setrate(e.target.value)}
                            />
                        </div> : ''}
                </div>

                <div className='row'>
                    <div className="col-md">
                        <label >?????????? ??????????????</label>
                        <input type="date" className="form-control my-2"
                            value={birthday}
                            onChange={(e) => setbirthday(e.target.value)}
                        />
                    </div>
                    {student_isring === 'yes' ?
                        <div className="col-md">
                            <label >???????????????? ???????? ????????????</label>
                            <div className=' my-2'>
                                <CreatableSelect
                                    components={components}
                                    inputValue={inputValue}
                                    isClearable
                                    isMulti
                                    menuIsOpen={false}
                                    onChange={(newValue) => setValue(newValue)}
                                    onInputChange={(newValue) => setInputValue(newValue)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="???????? ?????????????? ?????????? Enter"
                                    value={value}
                                />
                            </div>
                        </div>
                        :
                        <div className="col-md">
                            <label >?????? ??????????????</label>
                            <input type="text" className="form-control my-2"
                                value={placeofbirth}
                                onChange={(e) => setplaceofbirth(e.target.value)}
                            />
                        </div>
                    }
                </div>
                {student_isring === 'yes' ?
                    <div className="col-md">
                        <label >??????????????</label>
                        <input type="text" className="form-control my-2"
                            value={notes}
                            onChange={(e) => setnotes(e.target.value)}
                        />
                    </div>
                    :
                    <>
                        <div className='row'>
                            <div className='col-md'>
                                <label>?????????? ?????? ????????????</label>
                                <select className="form-control my-2" value={student_level_status}
                                    onChange={(e) => setstudent_level_status(e.target.value)}>
                                    <option value="beginner">??????????</option>
                                    <option value="reader">????????</option>
                                    <option value="hafez">????????</option>
                                    <option value="moujaz">????????</option>
                                </select>
                            </div>

                            <div className='col-md'>
                                <label>?????????????? ???????? ?????? ???? ???????? ??????</label>
                                <select className="form-control my-2" value={reading_level}
                                    onChange={(e) => setreading_level(e.target.value)}>
                                    <option value="tilawa">??????????</option>
                                    <option value="hifz">??????</option>
                                    <option value="kiraat">????????????</option>
                                </select>
                            </div>
                        </div>

                        <div className='row'>

                            <div className="col-md">
                                <label >?????????????? ?????????? ???????? ??????????</label>
                                <div className=' my-2'>
                                    <CreatableSelect
                                        components={components}
                                        inputValue={inputValue}
                                        isClearable
                                        isMulti
                                        menuIsOpen={false}
                                        onChange={(newValue) => setValue(newValue)}
                                        onInputChange={(newValue) => setInputValue(newValue)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="???????? ?????????? ?????????? Enter"
                                        value={value}
                                    />
                                </div>
                            </div>

                            <div className="col-md">
                                <label >???? ????????</label>
                                <input type="text" className="form-control my-2"
                                    value={memorizing}
                                    onChange={(e) => setmemorizing(e.target.value)}
                                />
                            </div>
                        </div>


                        <div className='row' >
                            <div className='col-md'>
                                <label>?????? ????????</label>
                                <select className="form-control my-2" value={bloodtype} onChange={(e) => setbloodtype(e.target.value)}>
                                    {arraybloodtypes ? arraybloodtypes.map((bloodtype) =>
                                        <option key={bloodtype.id} value={bloodtype.value}>{bloodtype.value}</option>) :
                                        '?????????? ...'}
                                </select>
                            </div>

                            <div className='col-md'>
                                <label>?????? ??????????</label>
                                <select className="form-control my-2" value={martialstatus}
                                    onChange={(e) => setmartialstatus(e.target.value)}>
                                    <option value="single">????????</option>
                                    <option value="married">??????????</option>
                                    <option value="divorced">??????????</option>
                                    <option value="widowed">????????</option>
                                </select>
                            </div>
                        </div>

                        <div className='row '>
                            <div className="col-md">
                                <label htmlFor="phone_number">????????</label>
                                <input type="text" name='phone_number' className="form-control my-2"
                                    value={phone_number}
                                    onChange={(e) => setPhone_number(e.target.value)}
                                    id="phone_number" />
                            </div>

                            <div className="col-md mx-md-2">
                                <label htmlFor="work_number">??????</label>
                                <input type="text" name='work_number' className="form-control my-2"
                                    value={work_number}
                                    onChange={(e) => setwork_number(e.target.value)}
                                    id="work_number" />
                            </div>

                            <div className="col-md">
                                <label htmlFor="home_number">????????</label>
                                <input type="text" name='home_number' className="form-control my-2"
                                    value={home_number}
                                    onChange={(e) => sethome_number(e.target.value)}
                                    id="home_number" />
                            </div>

                        </div>

                        <div className='row'>
                            <div className='col my-2'>
                                <FormControl className='col-12'>
                                    <InputLabel id="demo-multiple-name-label">???????????? ????????????????</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={suitabledays}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="???????????? ????????????????" />}
                                    >
                                        {days.map((day) => (
                                            <MenuItem
                                                key={day.id}
                                                value={day.value}
                                                style={getStyles(day.value, suitabledays, theme)}
                                            >
                                                {day.value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className='col my-2'>
                                <FormControl className='col-12'>
                                    <InputLabel id="demo-multiple-name-label">?????????????? ????????????????</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={suitabletimes}
                                        onChange={handleChangeTime}
                                        input={<OutlinedInput label="?????????????? ????????????????" />}
                                    >
                                        {times.map((time) => (
                                            <MenuItem
                                                key={time.id}
                                                value={time.value}
                                                style={getStyles(time.value, suitabletimes, theme)}
                                            >
                                                {time.value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </>
                }

                <CenterSelect center_id={getcenterid} c_id={center_id} />
                {student_isring === 'no' ?
                    <TeacherSelect teachers={teachers} teacher_id={geteditteacherid} tid={teacher_id} />

                    : ''
                }
                {student_isring === 'yes' ?
                    <>
                        <label>??????????????</label>
                        <select className="form-control col my-2" value={ringid}
                            onChange={(e) => setringid(e.target.value)}>
                            <option value={0}>???????? ?????? ??????????????</option>
                            {rings?.map(ring => <option key={ring.id} value={ring.id}>{ring.name}</option>)}
                        </select>
                    </>
                    : ''
                }
                <span>
                    {student_isring === 'yes' ?
                        <button className="btn btn-success mt-3 px-3" onClick={addringstudent}> ??????????</button> :
                        <button className="btn btn-success mt-3 px-3" onClick={addstudent}> ??????????</button>
                    }
                    <NavLink to='/students'>
                        <button className="btn btn-dark mt-3 px-3 mx-2"> ??????????</button>
                    </NavLink>
                </span>
            </div>
        </>
    )
}
