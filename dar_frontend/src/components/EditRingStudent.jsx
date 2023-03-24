import React, { useState, useContext, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
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
import { NavLink } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';

export default function EditRingStudent() {
  const { student_id: id } = useParams()

  const { session: { user: { role_id } } } = useContext(SessionContext);
  const { session: { user: { centers } } } = useContext(SessionContext);
  const defaultvalue = role_id === 3 || role_id === 4 ? centers[0]['center_id'] : 0;

  const student_id = AES.decrypt(id.replace(/_/g, '/'), 'secretKey').toString(CryptoJS.enc.Utf8);

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


  const [first_name, setFirst_name] = useState('')
  const [middle_name, setMiddle_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [phone_number, setPhone_number] = useState('')
  const [mothername, setmothername] = useState('')
  const [placeofbirth, setplaceofbirth] = useState('')
  const [birthday, setbirthday] = useState('')
  const [martialstatus, setmartialstatus] = useState('')
  const [schooluni, setschooluni] = useState('')
  const [major, setmajor] = useState('')
  const [rate, setrate] = useState('')
  const [bloodtype, setbloodtype] = useState('')
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
  const [student_level_status, setstudent_level_status] = useState(null)
  const [reading_level, setreading_level] = useState(null)
  const [memorizing, setmemorizing] = useState('')
  const [student_centerid, setstudent_centerid] = useState(null)
  const [teachers, setTeachers] = useState([])
  const [teacher_id, setTeacher_id] = useState(0)
  const [suitabledays, setsuitablesdays] = useState([])
  const [suitabletimes, setsuitablestimes] = useState([])
  const [inputValue, setInputValue] = useState('');
  const [inputSheikhs, setInputSheikhs] = useState('');
  const [sheikhs, setSheikhs] = useState('')
  const [value, setValue] = useState([]);
  const [rings, setrings] = useState([])
  const [ringid, setringid] = useState(0)
  const [notes, setnotes] = useState('')
  const theme = useTheme();
  const [loading, setloading] = useState(true)

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

  const handleKeyDownSheikhs = (event) => {
    if (!inputSheikhs) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setSheikhs((prev) => [...prev, createOption(inputSheikhs)]);
        setInputSheikhs('');
        event.preventDefault();
    }
  };

  const getTeachersByCenter = (center_id) => {
    setTeachers([])
    Api.get(`getAllTeachersByCenter/${center_id}`).then((res) => {
      console.log(res.data.data, 'teacgersss');
      setTeachers(res.data.data);
    })
  }

  const getcenterid = (id) => {
    setstudent_centerid(id)
    getTeachersByCenter(id)
  }

  const editstudent = (e) => {
    e.preventDefault();
    const skills_arr = []
    value.map(v => skills_arr.push(v.value))
    const sheikh_arr = []
    sheikhs.map(sh => sheikh_arr.push(sh.value))
    Api.post(`editstudent/${student_id}`, {
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
      father_number: fatherphonenumber,
      mother_number: motherphonenumber,
      mother_work: motherjob,
      father_work: fatherjob,
      student_level_status: student_level_status,
      teacher_id: teacher_id !== 0 ? teacher_id : null,
      address: address,
      suitable_times: suitabletimes.toString(),
      suitable_days: suitabledays.toString(),
      skills: skills_arr.toString(),
      memorizing: memorizing,
      center_id: student_centerid,
      ring_id: ringid,
      is_ring: true,
      sheikh_names: sheikh_arr.toString()
    }).then(
      (res) => {
        if (res.data.success) {
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

  const getRingStudent = (student_id) => {
    Api.get(`getringstudentbyid/${student_id}`).then((res) => {
      console.log({ res }, 'jjjkkjjk');
      setFirst_name(res.data.data['first_name'] )
      setMiddle_name(res.data.data['middle_name'])
      setLast_name(res.data.data['last_name'])
      setmothername(res.data.data['mother_name'])
      setnationality(res.data.data['nationality'])
      setgender(res.data.data['gender'])
      setaddress(res.data.data['address'])
      setcurrent_job(res.data.data['current_job'] ?? '')
      setschooluni(res.data.data['school_uni_name'])
      setmajor(res.data.data.major)
      setbirthday(res.data.data['birthdate'])
      setplaceofbirth(res.data.data['place_of_birth'] ?? '')
      const reading = res.data.data.reading_level === null ? '' : res.data.data.reading_level
      setreading_level(reading)
      const level_status = res.data.data.student_level_status === null ? '' : res.data.data.student_level_status
      setstudent_level_status(level_status)
      setmemorizing(res.data.data['memorizing'] ?? '')
      const blood = res.data.data.blood_type === null ? '' : res.data.data.blood_type
      setbloodtype(blood)
      const martial = res.data.data.marital_status === null ? '' : res.data.data.marital_status
      setmartialstatus(martial)
      setPhone_number(res.data.data['phone_number'] ?? '')
      setmotherphonenumber(res.data.data.mother_number ?? '')
      setfatherphonenumber(res.data.data.father_number ?? '')
      setmotherjob(res.data.data.mother_work ?? '')
      setfatherjob(res.data.data.father_work ?? '')
      setwork_number(res.data.data['work_number'] ?? '')
      sethome_number(res.data.data['home_number'] ?? '')
      setringid(res.data.data.ring_id)
      setrate(res.data.data.rate)
      setnotes(res.data.data.rate)
      const skills = res.data.data.skills ? res.data.data.skills.split(',').map(i => ({ label: i, value: i })) : []
      setValue(skills)
      const sheikh_names = res.data.data.sheikh_names ? res.data.data.sheikh_names.split(',').map(i => ({ label: i, value: i })) : []
      setSheikhs(sheikh_names)
      const suitable_days = res.data.data.suitable_days ? res.data.data.suitable_days.split(',') : []
      setsuitablesdays(suitable_days)
      const suitable_times = res.data.data.suitable_times ? res.data.data.suitable_times.split(',') : []
      setsuitablestimes(suitable_times)
      setstudent_centerid(res.data.data.center_id)
      setTeacher_id(res.data.data.teacher_id)
      setTimeout(() => {
        setloading(false)
      }, 1000);
    })
  }

  const getteacherid = (t_id) => {
    setTeacher_id(t_id)
  }

  const getringsbycenter = (center_id) => {
    setrings([])
    Api.get(`getringsbycenter/${center_id}`).
      then((res) => {
        setrings(res.data.data)
      }).catch(function (err) {
        console.log(err)
      })
  }

  useEffect(() => {
    getRingStudent(student_id)
  }, [])

  useEffect(() => {
    if (student_centerid) {
      getTeachersByCenter(student_centerid)
      getringsbycenter(student_centerid)
    }
  }, [student_centerid])

  return (
    <>
      {loading ? <div className='mt-5 text-center'><Spinner /></div> :
        <div className='container' style={{ width: '80%' }}>

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

            <div className="col-md">
              <label >مهنة الام</label>
              <input type="text" className="form-control my-2"
                value={motherjob}
                onChange={(e) => setmotherjob(e.target.value)} />
            </div>

            <div className="col-md">
              <label >مهنة الاب</label>
              <input type="text" className="form-control my-2"
                value={fatherjob}
                onChange={(e) => setfatherjob(e.target.value)}
              />
            </div>
          </div>


          <div className='row'>

            <div className="col-md">
              <label htmlFor="phone_number">هاتف شخصي</label>
              <input type="text" name='phone_number' className="form-control my-2"
                value={phone_number}
                onChange={(e) => setPhone_number(e.target.value)}
                id="phone_number" />
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

          <div className='row'>

            <div className="col-md">
              <label >مكان السكن</label>
              <input type="text" className="form-control my-2"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
            </div>

            <div className="col-md">
              <label >محفوظاته من القرآن</label>
              <input type="text" className="form-control my-2"
                value={memorizing}
                onChange={(e) => setmemorizing(e.target.value)}
              />
            </div>
          </div>

          <div className='row'>
            <div className="col-md">
              <label >تاريخ الولادة</label>
              <input type="date" className="form-control my-2"
                value={birthday}
                onChange={(e) => setbirthday(e.target.value)}
              />
            </div>

            <div className="col-md">
              <label >محل الولادة</label>
              <input type="text" className="form-control my-2"
                value={placeofbirth}
                onChange={(e) => setplaceofbirth(e.target.value)}
              />
            </div>
          </div>

          <div className="row">


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
          </div>

          <div className='row'>

            <div className="col-md">
              <label >
                الجامعة او المدرسة
              </label>
              <input type="text" className="form-control my-2"
                value={schooluni}
                onChange={(e) => setschooluni(e.target.value)}
              />
            </div>

            <div className="col-md">
              <label >السنة الدراسية</label>
              <input type="text" className="form-control my-2"
                value={major}
                onChange={(e) => setmajor(e.target.value)}
              />
            </div>

            <div className="col-md">
              <label>التقدير</label>
              <input type="text" className="form-control my-2"
                value={rate}
                onChange={(e) => setrate(e.target.value)}
              />
            </div>
          </div>

          <div className='row '>

            <div className="col-md mx-md-2">
              <label htmlFor="work_number">هاتف عمل</label>
              <input type="text" name='work_number' className="form-control my-2"
                value={work_number}
                onChange={(e) => setwork_number(e.target.value)}
                id="work_number" />
            </div>

            <div className="col-md">
              <label htmlFor="home_number">هاتف منزل</label>
              <input type="text" name='home_number' className="form-control my-2"
                value={home_number}
                onChange={(e) => sethome_number(e.target.value)}
                id="home_number" />
            </div>

          </div>

          <div className='row'>

            <div className="col-md">
              <label >العمل الحالي</label>
              <input type="text" className="form-control my-2"
                value={current_job}
                onChange={(e) => setcurrent_job(e.target.value)}
              />
            </div>

            <div className="col-md">
              <label >ملاحظات</label>
              <input type="text" className="form-control my-2"
                value={notes}
                onChange={(e) => setnotes(e.target.value)}
              />
            </div>
          </div>
          <>
            <div className='row'>
              <div className='col-md'>
                <label>مستوى حفظ القرآن</label>
                <select className="form-control my-2" value={student_level_status}
                  onChange={(e) => setstudent_level_status(e.target.value)}>
                  <option value={''} disabled>اختر المستوى </option>
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
                  <option value={''} disabled>
                    اختر المستوى
                  </option>
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
                    inputValue={inputSheikhs}
                    isClearable
                    isMulti
                    menuIsOpen={false}
                    onChange={(newValue) => setSheikhs(newValue)}
                    onInputChange={(newValue) => setInputSheikhs(newValue)}
                    onKeyDown={handleKeyDownSheikhs}
                    placeholder="اكتب الاسم واضغط Enter"
                    value={sheikhs}
                  />
                </div>
              </div>

            </div>


            <div className='row' >
              <div className='col-md'>
                <label>فئة الدم</label>
                <select className="form-control my-2" value={bloodtype} onChange={(e) => setbloodtype(e.target.value)}>
                  <option value={''} disabled>اختر فئة الدم</option>
                  {arraybloodtypes ? arraybloodtypes.map((bloodtype) =>
                    <option key={bloodtype.id} value={bloodtype.value}>{bloodtype.value}</option>) :
                    'تحميل ...'}
                </select>
              </div>

              <div className='col-md'>
                <label>وضع عائلي</label>
                <select className="form-control my-2" value={martialstatus}
                  onChange={(e) => setmartialstatus(e.target.value)}>
                  <option value="" disabled>اختر احد الخيارات</option>
                  <option value="single">اعزب</option>
                  <option value="married">متأهل</option>
                  <option value="divorced">منفصل</option>
                  <option value="widowed">ارمل</option>
                </select>
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

          <CenterSelect center_id={getcenterid} c_id={student_centerid} />
          <TeacherSelect teachers={teachers} teacher_id={getteacherid} tid={teacher_id} />

          <label>الحلقات</label>
          <select className="form-control col my-2" value={ringid}
            onChange={(e) => setringid(e.target.value)}>
            <option value={0}>اختر احد الحلقات</option>
            {rings?.map(ring => <option key={ring.id} value={ring.id}>{ring.name}</option>)}
          </select>

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
