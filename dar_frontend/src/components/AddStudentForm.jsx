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
import moment from 'moment';



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
        { 'id': 8, 'value': 'O-' },
        { 'id': 9, 'value': 'NA' }
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
    const [type_kiraat, settype_kiraat] = useState(0)
    const [file, setFile] = useState(null);
    const [registration_date, setRegistrationDate] = useState(moment().format('YYYY-MM-DD'))
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
        Api.get(`getAllTeachersByCenter/${center_id}`).then((res) => {
            setTeachers(res.data.data);
        })
    }

    const addringstudent = (e) => {
        e.preventDefault();
        const skills_arr = []
        value.map(v => skills_arr.push(v.value))
        Api.post('addstudent', {
            registration_date: registration_date,
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
                if (res.data.success) {
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
                    if (role_id === 1 || role_id === 2) {
                        setCenter_id(0)
                    }
                } else {
                    console.log({ res });
                }
            }
        ).catch(function (error) {
            console.log(error)
        })
    }
    const getcenterid = (id) => {
        setTeacher_id(0)
        setCenter_id(id)
    }

    const addstudent = (e) => {
        e.preventDefault();

        const sheikh_names_arr = []
        value.map(v => sheikh_names_arr.push(v.value))

        const formData = new FormData();
        formData.append('registration_date', registration_date);
        formData.append('file', file);
        formData.append('username', username);
        formData.append('first_name', first_name);
        formData.append('middle_name', middle_name);
        formData.append('last_name', last_name);
        formData.append('mother_name', mothername)
        formData.append('place_of_birth', placeofbirth);
        formData.append('birthdate', birthday);
        formData.append('marital_status', martialstatus);
        formData.append('reading_level', reading_level);
        formData.append('school_uni_name', schooluni);
        formData.append('major', major);
        formData.append('blood_type', bloodtype);
        formData.append('gender', gender);
        formData.append('nationality', nationality);
        formData.append('current_job', current_job);
        formData.append('phone_number', phone_number);
        formData.append('work_number', work_number);
        formData.append('home_number', home_number);
        formData.append('student_level_status', student_level_status);
        formData.append('center_id', center_id);
        formData.append('teacher_id', teacher_id !== 0 ? teacher_id : null);
        formData.append('address', address);
        formData.append('suitable_times', suitabletimes.toString());
        formData.append('suitable_days', suitabledays.toString());
        formData.append('memorizing', memorizing);
        formData.append('sheikh_names', sheikh_names_arr.toString());
        formData.append('female_question', female_question)
        const type = type_kiraat !== 0 ? type_kiraat : ''
        formData.append('type_kiraat', type)

        Api.post('addstudent', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((res) => {
            if (res.data.success) {
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
                setfemale_question(0)
                if(role_id === 1 || role_id === 2){
                    setCenter_id(0)
                }
                setTeacher_id(0)
                settype_kiraat(0)
                setFile(null)
            }
        }).catch(function (err) { console.log(err); })
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
        { 'id': 1, 'value': 'الاثنين' },
        { 'id': 2, 'value': 'الثلاثاء' },
        { 'id': 3, 'value': 'الاربعاء' },
        { 'id': 4, 'value': 'الخميس' },
        { 'id': 5, 'value': 'الجمعة' },
        { 'id': 6, 'value': 'السبت' },
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
                        <span>هل يتبع هذا الطالب لاحد الحلقات؟</span>
                        <span>
                            <label className='mx-1'>نعم</label>
                            <input type="radio" value='yes' name='student_isring'
                                onClick={(e) => setstudent_isring(e.target.value)} />
                        </span>
                        <span className='mx-2'>
                            <label className='mx-1'>كلا</label>
                            <input type="radio"
                                defaultChecked
                                value='no'
                                name='student_isring'
                                onClick={(e) => setstudent_isring(e.target.value)} />
                        </span>
                    </div>
                </div> */}

                <div className='row'>
                    <div className='col'>
                        <label htmlFor='registration_date' className='my-2'>تاريخ تعبئة الاستبانة</label>
                        <input type="date" max={moment().format('YYYY-MM-DD')}
                            className='form-control my-2'
                            id='registration_date'
                            value={registration_date} onChange={(e) => setRegistrationDate(e.target.value)} />
                    </div>
                </div>


                {/* first middle last name */}
                <div className='row'>
                    <div className="col-md">
                        <label htmlFor="f_name my-2">الاسم</label>
                        <input type="text" name='first_name' className="form-control my-2"
                            value={first_name}
                            onChange={(e) => setFirst_name(e.target.value)}
                            id="f_name" />
                    </div>

                    <div className="col-md">
                        <label htmlFor="l_name">اسم الاب</label>
                        <input type="text" className="form-control my-2"
                            value={middle_name}
                            onChange={(e) => setMiddle_name(e.target.value)}
                        />
                    </div>

                    <div className="col-md">
                        <label htmlFor="l_name">العائلة</label>
                        <input type="text" name='last_name' className="form-control my-2"
                            value={last_name}
                            onChange={(e) => setLast_name(e.target.value)}
                            id="l_name" />
                    </div>
                </div>


                <div className='row'>

                    <div className="col-md">
                        <label >اسم الام</label>
                        <input type="text" className="form-control my-2"
                            value={mothername}
                            onChange={(e) => setmothername(e.target.value)}
                        />
                    </div>

                    <div className="col-md">
                        <label >الجنسية</label>
                        <input type="text" className="form-control my-2"
                            value={nationality}
                            onChange={(e) => setnationality(e.target.value)}
                        />
                    </div>


                    <div className="col-md">
                        <label >الجنس</label>
                        <select className="form-control my-2" value={gender}
                            onChange={(e) => setgender(e.target.value)}>
                            <option value="male">ذكر</option>
                            <option value="female">انثى</option>
                        </select>
                    </div>

                    {student_isring === 'yes' ?
                        <>
                            <div className="col-md">
                                <label >مهنة الام</label>
                                <input type="text" className="form-control my-2"
                                    value={motherjob}
                                    onChange={(e) => setmotherjob(e.target.value)}
                                />
                            </div>

                            <div className="col-md">
                                <label >مهنة الاب</label>
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
                                <label >هاتف شخصي</label>
                                <input type="text" className="form-control my-2"
                                    value={phone_number}
                                    onChange={(e) => setPhone_number(e.target.value)}
                                />
                            </div>
                            <div className="col-md">
                                <label >هاتف الام</label>
                                <input type="text" className="form-control my-2"
                                    value={motherphonenumber}
                                    onChange={(e) => setmotherphonenumber(e.target.value)}
                                />
                            </div>

                            <div className="col-md">
                                <label >هاتف الاب</label>
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
                            <label >هل لديك مانع من القراءة مع شيخ؟</label>
                            <select className="form-control my-2" value={female_question}
                                onChange={(e) => setfemale_question(e.target.value)}>
                                <option value={0}>لا</option>
                                <option value={1}>نعم</option>
                            </select>
                        </div>
                        : ''}


                <div className='row'>

                    <div className="col-md">
                        <label >مكان السكن</label>
                        <input type="text" className="form-control my-2"
                            value={address}
                            onChange={(e) => setaddress(e.target.value)}
                        />
                    </div>

                    {student_isring === 'yes' ?
                        <div className="col-md">
                            <label >محفوظاته من القرآن</label>
                            <input type="text" className="form-control my-2"
                                value={memorizing}
                                onChange={(e) => setmemorizing(e.target.value)}
                            />
                        </div> :
                        <div className="col-md">
                            <label >العمل الحالي</label>
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
                            <label>المدرسة</label> :
                            <label >
                                الجامعة او المدرسة
                            </label>
                        }
                        <input type="text" className="form-control my-2"
                            value={schooluni}
                            onChange={(e) => setschooluni(e.target.value)}
                        />
                    </div>

                    <div className="col-md">
                        {student_isring === 'yes' ?
                            <label>الصف</label>
                            :
                            <label >السنة الدراسة او التخصص</label>
                        }
                        <input type="text" className="form-control my-2"
                            value={major}
                            onChange={(e) => setmajor(e.target.value)}
                        />
                    </div>

                    {student_isring === 'yes' ?
                        <div className="col-md">
                            <label>التقدير</label>
                            <input type="text" className="form-control my-2"
                                value={rate}
                                onChange={(e) => setrate(e.target.value)}
                            />
                        </div> : ''}
                </div>

                <div className='row'>
                    <div className="col-md">
                        <label >تاريخ الولادة</label>
                        <input type="date" className="form-control my-2"
                            value={birthday}
                            onChange={(e) => setbirthday(e.target.value)}
                        />
                    </div>
                    {student_isring === 'yes' ?
                        <div className="col-md">
                            <label >المهارات التي يجيدها</label>
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
                                    placeholder="اكتب المهارة واضغط Enter"
                                    value={value}
                                />
                            </div>
                        </div>
                        :
                        <div className="col-md">
                            <label >محل الولادة</label>
                            <input type="text" className="form-control my-2"
                                value={placeofbirth}
                                onChange={(e) => setplaceofbirth(e.target.value)}
                            />
                        </div>
                    }
                </div>
                {student_isring === 'yes' ?
                    <div className="col-md">
                        <label >ملاحظات</label>
                        <input type="text" className="form-control my-2"
                            value={notes}
                            onChange={(e) => setnotes(e.target.value)}
                        />
                    </div>
                    :
                    <>
                        <div className='row'>
                            <div className='col-md'>
                                <label>مستوى حفظ القرآن</label>
                                <select className="form-control my-2" value={student_level_status}
                                    onChange={(e) => setstudent_level_status(e.target.value)}>
                                    <option value="beginner">مبتدئ</option>
                                    <option value="reader">قارئ</option>
                                    <option value="hafez">حافظ</option>
                                    <option value="moujaz">مجاز</option>
                                </select>
                            </div>

                            <div className='col-md'>
                                <label>المستوى الذي تود القراءة فيه</label>
                                <select className="form-control my-2" value={reading_level}
                                    onChange={(e) => setreading_level(e.target.value)}>
                                    <option value="tilawa">تلاوة</option>
                                    <option value="hifz">حفظ</option>
                                    <option value="kiraat">قراءات</option>
                                </select>
                            </div>
                        </div>

                        {reading_level === 'kiraat' ?
                            <div className='row'>
                                <div className='col-md'>
                                    <label>نوع الجمع في القراءات</label>
                                    <select className="form-control my-2" value={type_kiraat}
                                        onChange={(e) => settype_kiraat(e.target.value)}>
                                        <option value={0} disabled>اختر احد الخيارات</option>
                                        <option value="ifrad">افراد</option>
                                        <option value="kobra">القراءات العشر الكبرى</option>
                                        <option value="soghra">القراءات العشر الصغرى</option>
                                    </select>
                                </div>

                                <div className='col-md'>
                                    <label>نوع الجمع في القراءات</label>
                                    <input className='form-control' type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} />
                                </div>
                            </div>
                            : ''}

                        <div className='row'>

                            <div className="col-md">
                                <label >المشايخ الذين قرأت عندهم</label>
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
                                        placeholder="اكتب الاسم واضغط Enter"
                                        value={value}
                                    />
                                </div>
                            </div>

                            <div className="col-md">
                                <label >كم تحفظ</label>
                                <input type="text" className="form-control my-2"
                                    value={memorizing}
                                    onChange={(e) => setmemorizing(e.target.value)}
                                />
                            </div>
                        </div>


                        <div className='row' >
                            <div className='col-md'>
                                <label>فئة الدم</label>
                                <select className="form-control my-2" value={bloodtype} onChange={(e) => setbloodtype(e.target.value)}>
                                    {arraybloodtypes ? arraybloodtypes.map((bloodtype) =>
                                        <option key={bloodtype.id} value={bloodtype.value}>{bloodtype.value}</option>) :
                                        'تحميل ...'}
                                </select>
                            </div>

                            <div className='col-md'>
                                <label>وضع عائلي</label>
                                <select className="form-control my-2" value={martialstatus}
                                    onChange={(e) => setmartialstatus(e.target.value)}>
                                    <option value="single">اعزب</option>
                                    <option value="married">متأهل</option>
                                    <option value="divorced">منفصل</option>
                                    <option value="widowed">ارمل</option>
                                </select>
                            </div>
                        </div>

                        <div className='row '>
                            <div className="col-md">
                                <label htmlFor="phone_number">جوال</label>
                                <input type="text" name='phone_number' className="form-control my-2"
                                    value={phone_number}
                                    onChange={(e) => setPhone_number(e.target.value)}
                                    id="phone_number" />
                            </div>

                            <div className="col-md mx-md-2">
                                <label htmlFor="work_number">عمل</label>
                                <input type="text" name='work_number' className="form-control my-2"
                                    value={work_number}
                                    onChange={(e) => setwork_number(e.target.value)}
                                    id="work_number" />
                            </div>

                            <div className="col-md">
                                <label htmlFor="home_number">منزل</label>
                                <input type="text" name='home_number' className="form-control my-2"
                                    value={home_number}
                                    onChange={(e) => sethome_number(e.target.value)}
                                    id="home_number" />
                            </div>

                        </div>

                        <div className='row'>
                            <div className='col my-2'>
                                <FormControl className='col-12'>
                                    <InputLabel id="demo-multiple-name-label">الايام المناسبة</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={suitabledays}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="الايام المناسبة" />}
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
                                    <InputLabel id="demo-multiple-name-label">الاوقات المناسبة</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={suitabletimes}
                                        onChange={handleChangeTime}
                                        input={<OutlinedInput label="الاوقات المناسبة" />}
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
                        <label>الحلقات</label>
                        <select className="form-control col my-2" value={ringid}
                            onChange={(e) => setringid(e.target.value)}>
                            <option value={0}>اختر احد الحلقات</option>
                            {rings?.map(ring => <option key={ring.id} value={ring.id}>{ring.name}</option>)}
                        </select>
                    </>
                    : ''
                }
                <span>
                    {student_isring === 'yes' ?
                        <button className="btn btn-success mt-3 px-3" onClick={addringstudent}> اضافة</button> :
                        <button className="btn btn-success mt-3 px-3" onClick={addstudent}> اضافة</button>
                    }
                    <NavLink to='/students'>
                        <button className="btn btn-dark mt-3 px-3 mx-2"> الغاء</button>
                    </NavLink>
                </span>
            </div>
        </>
    )
}
