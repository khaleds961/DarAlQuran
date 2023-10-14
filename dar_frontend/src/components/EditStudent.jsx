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
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import countries from '../JsonFiles/countries.json'

export default function EditStudent() {

  const navigate = useNavigate()
  const { id: encrypt } = useParams()

  const id = AES.decrypt(encrypt.replace(/_/g, '/'), 'secretKey').toString(CryptoJS.enc.Utf8);

  const { session: { token } } = useContext(SessionContext)
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
  const [oldNationalityName, setOldNationalityName] = useState(null)
  const [newnationality, setnewnationality] = useState('')
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
  const [student, setstudent] = useState([])
  const [registration_date, setRegistrationDate] = useState('')
  const [loading, setloading] = useState(true)
  const [index, setindex] = useState(null)
  const [pdf_file, setPdf_file] = useState('download')
  const [file, setFile] = useState(null);

  const getStudentById = (student_id) => {
    Api.get(`getstudentbyid/${student_id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }).then((res) => {
        console.log({ res });
        setstudent(res.data.data)
        setRegistrationDate(res.data.data.registration_date)
        setFirst_name(res.data.data['first_name'])
        setMiddle_name(res.data.data['middle_name'])
        setLast_name(res.data.data['last_name'])
        setmothername(res.data.data['mother_name'])
        const oldNationality = countries.find(country => country.code === res.data.data['nationality']);
        if (oldNationality !== undefined) {
          const index = countries.findIndex(item => item.name === oldNationality.name);
          setOldNationalityName(oldNationality.name);
          setindex(index)
        } else {
          setnationality('')
        }
        setgender(res.data.data['gender'])
        setaddress(res.data.data['address'])
        setcurrent_job(res.data.data['current_job'])
        setschooluni(res.data.data['school_uni_name'])
        setmajor(res.data.data.major)
        setbirthday(res.data.data['birthdate'])
        setplaceofbirth(res.data.data['place_of_birth'])
        setreading_level(res.data.data['reading_level'])
        setstudent_level_status(res.data.data['student_level_status'])
        setmemorizing(res.data.data['memorizing'])
        setbloodtype(res.data.data['blood_type'])
        setmartialstatus(res.data.data['marital_status'])
        setPhone_number(res.data.data['phone_number'])
        setwork_number(res.data.data['work_number'])
        sethome_number(res.data.data['home_number'])
        setTeacher_id(res.data.data['teacher_id'])
        setCenter_id(res.data.data.center_id)
        const sheikh_names = res.data.data.sheikh_names ? res.data.data.sheikh_names.split(',').map(i => ({ label: i, value: i })) : []
        setValue(sheikh_names)
        const suitable_days = res.data.data.suitable_days ? res.data.data.suitable_days.split(',') : []
        setsuitablesdays(suitable_days)
        const suitable_times = res.data.data.suitable_times ? res.data.data.suitable_times.split(',') : []
        setsuitablestimes(suitable_times)
        setloading(false)
      })
  }

  const editPdf = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('previous_path',student.pathpdf)
    formData.append('file', file);
    Api.post(`editPdf/${student.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if(res.data.success){
        getStudentById(id)
        Swal.fire(res.data.message,'','success')
        setPdf_file('download')
      }else{
        Swal.fire(res.data,'','error')
      }
    }).catch(function(err){console.log(err);})
  }

  const handleDownload = () => {
    window.open(student.pathpdf);
  };

  useEffect(() => {
    getStudentById(id)
  }, [])

  const geteditteacherid = (t_id) => {
    setTeacher_id(t_id)
  }

  useEffect(() => {
    if (center_id !== 0) {
      getTeachersByCenter()
    }
  }, [center_id])


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
    // setTeacher_id(0)
    Api.get(`getAllTeachersByCenter/${center_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      setTeachers(res.data.data);
    })
  }

  const getcenterid = (id) => {
    setCenter_id(id)
    setTeacher_id(0)
    getTeachersByCenter(id)
  }

  const getteacherid = (id) => {
    setTeacher_id(id)
  }
  const editstudent = (e) => {

    e.preventDefault();
    const sheikh_names_arr = []
    value.map(v => sheikh_names_arr.push(v.value))
    if(!teacher_id || teacher_id == 0){
      Swal.fire('تأكد من ادخال الاستاذ', '', 'warning')
      return
    }
    Api.post(`editstudent/${id}`, {
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
      nationality: newnationality,
      current_job: current_job,
      phone_number: phone_number,
      work_number: work_number,
      home_number: home_number,
      student_level_status: student_level_status,
      center_id: center_id,
      teacher_id: teacher_id,
      address: address,
      suitable_times: suitabletimes.toString(),
      suitable_days: suitabledays.toString(),
      sheikh_names: sheikh_names_arr.toString(),
      memorizing: memorizing,
      female_question: female_question,
      registration_date: registration_date
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(
      (res) => {
        if (res.data.success) {
          navigate('/students')
          Swal.fire(res.data.message, '', 'success')
        }
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

  const handleChangeNationality = (event, value) => {
    if (value !== null) {
      const newindex = countries.findIndex(item => item.name === value.name)
      setnewnationality(value.code)
      setindex(newindex)
      return
    }
    setnewnationality('')
  };

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
    { 'id': 11, 'value': '9:30' },
    { 'id': 12, 'value': '10:00' },
    { 'id': 13, 'value': '10:30' },
    { 'id': 14, 'value': '11:00' },
    { 'id': 15, 'value': '11:30' },
    { 'id': 16, 'value': '12:00' },
    { 'id': 17, 'value': '12:30' },
    { 'id': 18, 'value': '13:00' },
    { 'id': 19, 'value': '13:30' },
    { 'id': 20, 'value': '14:00' },
    { 'id': 21, 'value': '14:30' },
    { 'id': 22, 'value': '15:00' },
    { 'id': 23, 'value': '15:30' },
    { 'id': 24, 'value': '16:00' },
    { 'id': 25, 'value': '16:30' },
    { 'id': 26, 'value': '17:00' },
    { 'id': 27, 'value': '17:30' },
    { 'id': 28, 'value': '18:00' },
    { 'id': 29, 'value': '18:30' },
    { 'id': 30, 'value': '19:00' },
    { 'id': 31, 'value': '19:30' },
    { 'id': 32, 'value': '20:00' },
    { 'id': 33, 'value': '20:30' },
    { 'id': 34, 'value': '21:00' },
    { 'id': 35, 'value': '21:30' },
    { 'id': 36, 'value': '22:00' },
]

  return (
    <>
      {loading ? <div className='mt-5 text-center'><Spinner /></div> :
        <div className='container' style={{ width: '80%' }}>

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
              <label>الجنسية</label>
              <div className=''>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={countries}
                  getOptionLabel={(option) => option.name}
                  value={countries[index] ?? null}
                  renderInput={(params) => <TextField {...params} label="الجنسية" />}
                  onChange={handleChangeNationality}
                />
              </div>
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

          {/* {student_isring === 'yes' ?
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
            : ''} */}

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
                  <label>المستوى الذي تود ان يقرأ فيه</label>
                  <select className="form-control my-2" value={reading_level}
                    onChange={(e) => setreading_level(e.target.value)}>
                    <option value="tilawa">تلاوة</option>
                    <option value="hifz">حفظ</option>
                    <option value="kiraat">قراءات</option>
                  </select>
                </div>
              </div>

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

              {student?.path ?
                <div className='row '>
                  <div className='col-md'>
                    <div className='d-md-flex align-items-center justify-content-between p-3 border'>
                      <div >
                        <p className='my-2'>تحميل الاجازة او تعديلها؟</p>

                        <div>
                          <div>
                            <input type="radio"
                              id='edit'
                              name='pdf_file'
                              value='edit'
                              checked={pdf_file === 'edit'}
                              onChange={(e) => setPdf_file(e.target.value)}
                            />
                            <label htmlFor='edit' className='mx-1'>تعديل الملف</label>
                          </div>

                          <div className=' my-2' >
                            <input type="radio"
                              id='download'
                              name='pdf_file'
                              value='download'
                              checked={pdf_file === 'download'}
                              onChange={(e) => setPdf_file(e.target.value)} />
                            <label htmlFor='download' className='mx-1'>تحميل الملف</label>


                          </div>
                        </div>

                      </div>

                      <div className='mx-md-4'>
                        {pdf_file == 'download' ?
                          <button className='btn btn-success' onClick={handleDownload}>تحميل </button>
                          :
                          <div className='d-md-flex border rounded p-3'>
                            <input type='file' accept=".pdf" onChange={e => setFile(e.target.files[0])} />
                            <button className='btn btn-primary mt-3 mt-md-0' onClick={editPdf}>تعديل </button>
                          </div>
                        }
                      </div>
                    </div>

                  </div>
                </div>
                : ''}

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
            <button className="btn btn-success mt-3 px-3" onClick={editstudent}> تعديل</button>

            <NavLink to='/students'>
              <button className="btn btn-dark mt-3 px-3 mx-2"> الغاء</button>
            </NavLink>
          </span>
        </div>
      }
    </>
  )
}
