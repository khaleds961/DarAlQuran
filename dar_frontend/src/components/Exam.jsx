import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Api from '../Api';
import Swal from 'sweetalert2';
import moment from 'moment';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Exam() {


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
    const [from_jiz, setfrom_jizz] = useState(null)
    const [from, setfrom] = useState('')
    const [to_jiz, setto_jiz] = useState(null)
    const [to, setto] = useState('')
    const [get_ijaza, setget_ijaza] = useState('yes')
    const [answers, setAnswers] = useState([])
    const [date, setdate] = useState('')
    const [grade, setgrade] = useState('')


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

    const ajzaa = [
        {
            name: 'الاول',
            id: 1
        },
        {
            name: 'الثاني ',
            id: 2
        }
        ,
        {
            name: 'الثالث',
            id: 3
        }
        ,
        {
            name: 'الرابع',
            id: 4
        }
        ,
        {
            name: 'الخامس ',
            id: 5
        }

        ,
        {
            name: 'السادس',
            id: 6
        }
        ,
        {
            name: 'السابع ',
            id: 7
        }
        ,
        {
            name: 'الثامن',
            id: 8
        }
        ,
        {
            name: 'التاسع',
            id: 9
        }
        , {
            name: 'العاشر',
            id: 10
        }
        , {
            name: 'الحادي عشر',
            id: 11
        }
        , {
            name: 'الثاني عشر',
            id: 12
        }
        , {
            name: 'الثالث عشر',
            id: 13
        }
        , {
            name: 'الرابع عشر ',
            id: 14
        }
        , {
            name: 'الخامس عشر',
            id: 15
        }
        , {
            name: 'السادس عشر',
            id: 16
        }
        , {
            name: 'السابع عشر',
            id: 17
        }
        , {
            name: 'الثامن عشر',
            id: 18
        }
        , {
            name: 'التاسع عشر',
            id: 19
        }
        , {
            name: 'العشرين',
            id: 20
        },
    ]


    const getAllTeachers = () => {
        Api.get(`allteachers`).then((res) => {
            if (res.data.success) {
                setteachers(res.data.data)
            }
        })
    }

    const getAllStudents = () => {
        Api.get(`allstudents`).then((res) => {
            if (res.data.success) {
                setstudents(res.data.data)
            }
        })
    }

    const getallcenters = () => {
        Api.get(`getcenters`).then((res) => {
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

    const handleChangeFrom = (event, value) => {
        if (value) {
            setfrom_jizz(value)
            setfrom(value.id);
        } else {
            setfrom_jizz(null)
            setfrom('');
        }
    }

    const handleChangeTo = (event, value) => {
        if (value) {
            setto_jiz(value)
            setto(value.id);
        } else {
            setto_jiz(null)
            setto('');
        }
    }

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

        if (teacher_id.length === 3 && selectedRiwaya_id && teacher_student_id && from_jiz && to_jiz && get_ijaza && date) {
            Api.post(`addexam`, {
                teacher_id_1: teacher_id[0],
                teacher_id_2: teacher_id[1],
                teacher_id_3: teacher_id[2],
                tarik: selectedRiwaya_id,
                grade: grade,
                teacher_student: teacher_student_id,
                student_id: selected_student_id,
                center_id: centerid,
                jizie_from: from,
                jizie_to: to,
                decision: get_ijaza,
                note: answers.length > 0 ? answers.toString() : null,
                date: date
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
                    setfrom_jizz(null)
                    setfrom('')
                    setto_jiz(null)
                    setto('')
                    setget_ijaza('yes')
                    setAnswers([])
                    setdate('')
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
        <div style={{ width: '50%', margin: 'auto' }}>
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
                            // sx={{ width: 400 }}
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
                        // sx={{ width: 400 }}
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
                        // sx={{ width: 400 }}
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
                        // sx={{ width: 400 }}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="مركز" />}
                        value={selectedcenter}
                        onChange={handleChangeCenter}
                    />
                </div>

                <div>
                    <p className='h6 my-3'>وكان الاختبار في الاجزاء :  </p>
                    <div className='row'>
                        <div className='col my-2'>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={ajzaa}
                                // sx={{ width: 400 }}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params} label="من الجزء" />}
                                value={from_jiz}
                                onChange={handleChangeFrom}
                            />
                        </div>

                        <div className='col my-2'>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={ajzaa}
                                // sx={{ width: 400 }}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params} label="الى الجزء" />}
                                value={to_jiz}
                                onChange={handleChangeTo}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <p className='h6 my-3'>وبلغ مجموع الدرجات :
                        <input className='mx-2 my-2 py-2 text-dark text-center'
                            value={grade}
                            onChange={(e) => setgrade(e.target.value)}
                            type="text"
                            style={{ border: '0', outline: '0' }} />
                        من 100.
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

                    </div> : ''}
                <div className=' my-4 row'>
                    <button className='btn btn-success' onClick={handleSubmit}>اضافة</button>
                </div>
            </div>
        </div>
    )
}