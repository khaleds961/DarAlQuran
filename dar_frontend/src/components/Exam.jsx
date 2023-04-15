import React, { useContext, useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Api from '../Api';
import Swal from 'sweetalert2';
import moment from 'moment';
import SessionContext from '../session/SessionContext'

export default function Exam() {

    const { session: { token } } = useContext(SessionContext)


    const [teachers, setteachers] = useState([])
    const [selectedTeachers, setSelectedTeachers] = useState([])
    const [teacher_id, setTeahcer_id] = useState([])
    const [students, setstudents] = useState([])
    const [selectedStudents, setSelectedStudents] = useState(null)
    const [selected_student_id, setselected_student_id] = useState('')
    const [selectedRiwaya, setselectedRiwaya] = useState(null)
    const [selectedRiwaya_id, setselectedRiwaya_id] = useState('')
    const [teacher_student, setteacher_student] = useState(null)
    const [teacher_student_id, setteacher_student_id] = useState([])
    const [centers, setcenters] = useState([])
    const [selectedcenter, setselectedcenter] = useState(null)
    const [centerid, setcenterid] = useState('')
    const [get_ijaza, setget_ijaza] = useState('yes')
    const [answers, setAnswers] = useState([])
    const [date, setdate] = useState('')
    const [grade, setgrade] = useState('')
    const [has_receive_ijaza, setHas_receive_ijaza] = useState('')
    const [recieve_ijaza_date, setrecieve_ijaza_date] = useState('')
    const [ijaza_in, setijaza_in] = useState('')

    const riwayat = [
        {
            name: ' حفص عن عاصم ',
            id: 1
        },
        {
            name: ' أبي الحارث عن الكسائي ',
            id: 2
        }
        ,
        {
            name: ' إدريس عن خلف البزار',
            id: 3
        }
        ,
        {
            name: ' إسحاق الوراق عن خلف البزار',
            id: 4
        }
        ,
        {
            name: ' روح عن يعقوب الحضرمي ',
            id: 5
        }

        ,
        {
            name: ' قنبل عن ابن كثير ',
            id: 6
        }
        ,
        {
            name: ' قالون عن نافع ',
            id: 7
        }
        ,
        {
            name: '   رويس عن يعقوب الحضرمي ',
            id: 8
        }
        ,
        {
            name: ' هشام عن ابن عامر ',
            id: 9
        }
        , {
            name: ' خلف عن حمزة ',
            id: 10
        }
        , {
            name: ' خلاد عن حمزة ',
            id: 11
        }
        , {
            name: ' ورش عن نافع',
            id: 12
        }
        , {
            name: ' الدوري عن أبي عمر',
            id: 13
        }
        , {
            name: ' شعبة عن عاصم ',
            id: 14
        }
        , {
            name: ' السوسي عن أبي عمر',
            id: 15
        }
        , {
            name: ' الدوري عن الكسائي ',
            id: 16
        }
        , {
            name: ' البزي عن ابن كثير',
            id: 17
        }
        , {
            name: ' ابن وردان عن أبي جعفر',
            id: 18
        }
        , {
            name: ' ابن ذكوان عن ابن عامر ',
            id: 19
        }
        , {
            name: '  ابن جماز عن أبي جعفر',
            id: 20
        },
        {
            name: 'القراءات العشر من طريقي الشاطبية والدرة',
            id: 21
        },
        {
            name: 'القراءات العشر من طريق طيبة النشر',
            id: 22
        },
        {
            name: 'ورش من طريق الازرق',
            id: 23
        },
        {
            name: 'ورش من طريق الاصبهاني',
            id: 24
        },
        {
            name: 'الكوفيين',
            id: 25
        },
        {
            name: 'حفص عن عاصم من طريق الشاطبية  ',
            id: 26
        },
    ]

    const getAllTeachers = () => {
        Api.get(`allteachers`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            if (res.data.success) {
                setteachers(res.data.data)
            }
        })
    }

    const getAllStudents = () => {
        Api.get(`allstudents`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            if (res.data.success) {
                setstudents(res.data.data)
            }
        })
    }

    const getallcenters = () => {
        Api.get(`getcenters`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setcenters(res.data.data)
        })
    }

    const handleChange = (event, value) => {
        if (value.length > 3) {
            // Get the first three selected options
            const selected = value.slice(0, 3);
            const teacher_ids = selected.map((option) => option.id)
            setTeahcer_id(teacher_ids)
            setSelectedTeachers(selected);
        } else {
            setSelectedTeachers(value);
            const teacher_ids = value.map((option) => option.id)
            setTeahcer_id(teacher_ids)
        }
    };

    const handleChangeStudents = (event, value) => {
        if (value) {
            setselected_student_id(value.id)
            setSelectedStudents(value);
            return
        }
        setselected_student_id('')
        setSelectedStudents(null);
    };

    const handleChangeRiwayah = (event, value) => {
        if (value) {
            setselectedRiwaya(value)
            setselectedRiwaya_id(value.id);
            return
        }
        setselectedRiwaya(null)
        setselectedRiwaya_id('');
    };

    const handleChangeTeacher = (event, value) => {
        if (value) {
            setteacher_student(value)
            setteacher_student_id(value.id);
            return
        }
        setteacher_student(null)
        setteacher_student_id('');
    };

    const handleChangeCenter = (event, value) => {
        if (value) {
            setselectedcenter(value)
            setcenterid(value.id);
            return
        }
        setselectedcenter(null)
        setcenterid('');
    };

    const handleAddAnswer = () => {
        setAnswers([...answers, '']);
    };

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleRemoveAnswer = (index) => {
        const newAnswers = [...answers];
        newAnswers.splice(index, 1);
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {

        if (teacher_id.length === 2 || teacher_id.length === 3 && selectedRiwaya_id && teacher_student_id && ijaza_in && get_ijaza && date && ijaza_in) {
            Api.post(`addexam`, {
                teacher_id_1: teacher_id[0],
                teacher_id_2: teacher_id[1],
                teacher_id_3: teacher_id.length === 2 ? '' : teacher_id[2],
                tarik: selectedRiwaya_id,
                grade: grade,
                teacher_student: teacher_student_id,
                student_id: selected_student_id,
                center_id: centerid,
                decision: get_ijaza,
                ijaza_in: ijaza_in,
                note: answers.length > 0 ? answers.toString() : null,
                date: date,
                recieve_ijaza_date: recieve_ijaza_date,
                has_receive_ijaza: has_receive_ijaza
            }, {
                headers: { Authorization: `Bearer ${token}` }
            }).then((res) => {
                if (res.data.success) {
                    Swal.fire(res.data.message, '', 'success')
                    setSelectedTeachers([])
                    setTeahcer_id([])
                    setcenterid('')
                    setselectedcenter(null)
                    setSelectedStudents(null)
                    setselected_student_id('')
                    setselectedRiwaya_id('')
                    setselectedRiwaya(null)
                    setgrade('')
                    setteacher_student(null)
                    setteacher_student_id([])
                    setget_ijaza('yes')
                    setAnswers([])
                    setdate('')
                    setrecieve_ijaza_date('')
                    setHas_receive_ijaza('')
                    setijaza_in('')
                }
            })
        } else {
            Swal.fire('سجل المعلومات كاملة قبل الاضافة', '', 'warning')
        }
    };

    useEffect(() => {
        getAllTeachers()
        getAllStudents()
        getallcenters()
    }, [])

    return (
        <div className='responsive_exam'>
            <div className='row mb-5'>
                <div>
                    <p className='h6 my-3'>عقدت اللجنة العلمية في دار القرآن الكريم المؤلفة من :</p>
                    <div className=''>
                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={teachers}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.teacher_name}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        checked={selected}
                                        color="primary"
                                        style={{ marginRight: 8 }}
                                        // Add the value to the selected array when checked
                                        onClick={(event) => {
                                            if (!selected) {
                                                handleChange(event, [...selectedTeachers, option]);
                                            }
                                        }}
                                        // Remove the value from the selected array when unchecked
                                        onChange={(event) => {
                                            if (selected) {
                                                handleChange(
                                                    event,
                                                    selectedTeachers.filter((teacher) => teacher !== option),
                                                );
                                            }
                                        }}
                                    />
                                    {option.teacher_name}
                                </li>
                            )}
                            // style={{ width: 400 }}
                            renderInput={(params) => (
                                <TextField {...params} label="اسماء المشايخ" placeholder="" />
                            )}
                            // Use the onChange event to update the selectedTeachers state
                            onChange={handleChange}
                            // Pass the selectedTeachers state as the value prop
                            value={selectedTeachers}
                        />
                    </div>
                </div>

                <div>
                    <p className='h6 my-3'>جلسة اختبار الطالب(ة) :</p>
                    <div className=''>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={students}
                            getOptionLabel={(option) => option.student_name}
                            renderInput={(params) => <TextField {...params} label="اسماء الطلاب" />}
                            value={selectedStudents}
                            onChange={handleChangeStudents}
                        />
                    </div>
                </div>

                <div>
                    <p className='h6 my-3'>بتاريخ : </p>
                    <input type="date" className='form-control'
                        max={moment().format('YYYY-MM-DD')}
                        value={date}
                        onChange={(e) => setdate(e.target.value)} />
                </div>

                <div>
                    <p className='h6 my-3'>حيث قرأت ختمة كاملة برواية : </p>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={riwayat}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="الروايات" />}
                        value={selectedRiwaya}
                        onChange={handleChangeRiwayah}
                    />
                </div>

                <div>
                    <p className='h6 my-3'>على : </p>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={teachers}
                        getOptionLabel={(option) => option.teacher_name}
                        renderInput={(params) => <TextField {...params} label="شيخ الطالب" />}
                        value={teacher_student}
                        onChange={handleChangeTeacher}
                    />
                </div>

                <div>
                    <p className='h6 my-3'>في مركز : </p>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={centers}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="مركز" />}
                        value={selectedcenter}
                        onChange={handleChangeCenter}
                    />
                </div>

                <div>
                    <p className='h6 my-3'>وكان الاختبار في :  </p>
                    <div className='row'>
                        <div className='col'>
                            <select name="" id="" className='form-control' value={ijaza_in}
                                onChange={(e) => setijaza_in(e.target.value)}>
                                <option value="" disabled>-- ضع خيارا -- </option>
                                <option value="full_quran">القرآن كاملا</option>
                                <option value="last_ten">العشر الاواخر</option>
                                <option value="albaqara">سورة البقرة</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='mx-1'>
                    <p className='h6 my-3'>وبلغ مجموع الدرجات :
                        <input className='my-2 py-2 mx-md-2 text-dark text-center'
                            value={grade}
                            onChange={(e) => setgrade(e.target.value)}
                            type="text"
                            style={{ border: '0', outline: '0' }} />
                        <span className='mx-2'>
                            من 100.
                        </span>
                    </p>
                </div>

                <div>
                    <p className='h6 my-3'>وقد قررت اللجنة ما يلي : </p>
                    <div>
                        <div className='mb-2 d-flex align-items-center'>
                            <input type="radio" name='receive_ijaza'
                                className='mx-2'
                                id='get_ijaza'
                                value='yes'
                                checked={get_ijaza === 'yes'}
                                onChange={(e) => setget_ijaza(e.target.value)}
                            />
                            <label htmlFor="get_ijaza">
                                منح الاجازة بالسند المتصل الى حضرة النبي عليه الصلاة والسلام.
                            </label>
                        </div>

                        <div>
                            <input type="radio"
                                name='receive_ijaza'
                                className='mx-2' id='get_not_ijaza'
                                value='no'
                                checked={get_ijaza === 'no'}
                                onChange={(e) => setget_ijaza(e.target.value)} />
                            <label htmlFor="get_not_ijaza">
                                اعادة الاختبار للاسباب التالية :
                            </label>
                        </div>
                    </div>

                </div>

                {get_ijaza === 'no' ?
                    <div>
                        {answers.map((answer, index) => (
                            <div key={index}>
                                <TextField
                                    label={`اجابة ${index + 1}`}
                                    value={answer}
                                    onChange={(event) => handleAnswerChange(index, event.target.value)}
                                    variant="outlined"
                                    margin="normal"
                                />
                                <button className='btn btn-success mx-2 mt-4' onClick={() => handleRemoveAnswer(index)}>حذف</button>
                            </div>
                        ))}
                        <div className='my-2'>
                            <button className='btn btn-primary mx-2' onClick={handleAddAnswer}>اضافة سبب</button>
                        </div>

                    </div> :

                    <div className='my-3'>
                        <label htmlFor="has_receive_ijaza my-2" />
                        <b>هل استلم اجازته؟</b>
                        <select id="has_receive_ijaza" name='ijaza_info' className='form-control my-2'
                            value={has_receive_ijaza}
                            onChange={(e) => setHas_receive_ijaza(e.target.value)}>
                            <option value="" disabled>-- اختر احد الخيارات --</option>
                            <option value={0}>كلا</option>
                            <option value={1}>نعم</option>
                        </select>

                        {has_receive_ijaza == 1 ?
                            <div className='my-2'>
                                <label htmlFor="receive_ijaza_date" className='my-2'>
                                    <b>  تاريخ الاستلام</b>
                                </label>
                                <input type="date" className='form-control' id='receive_ijaza_date'
                                    value={recieve_ijaza_date}
                                    max={moment().format('YYYY-MM-DD')}
                                    onChange={(e) => setrecieve_ijaza_date(e.target.value)} />
                            </div>
                            : ''}
                    </div>


                }

                <div className=' my-4 mx-2 row'>
                    <button className='btn btn-success' onClick={handleSubmit}>اضافة</button>
                </div>
            </div>
        </div>
    )
}
