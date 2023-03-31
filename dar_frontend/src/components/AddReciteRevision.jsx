import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Api from '../Api'
import { useTheme } from '@mui/material/styles';
import Swal from 'sweetalert2';
import moment from 'moment';
import SessionContext from '../session/SessionContext';

function AddReciteRevision() {

  const navigate = useNavigate()
  const { session: { token } } = useContext(SessionContext)

  //Material UI
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  const { id } = useParams()
  const { rev_rec } = useParams()
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
  const [riwayahname, setriwayahname] = useState(0)
  const [surahs, setSurahs] = useState([])
  const [fromsurah, setfromsurah] = useState(0)
  const [tosurah, settosurah] = useState(0)
  const [fromayya, setfromayya] = useState('')
  const [toayya, settoayya] = useState('')
  const [frompage, setfrompage] = useState('')
  const [topage, settopage] = useState('')
  const [notes, setnotes] = useState('')
  const [type, settype] = useState('revision')
  const [absence_type, setabsence_type] = useState(0)
  const [date, setdate] = useState(moment().format('YYYY-MM-DD'))

  const getSurahList = () => {
    Api.get(`https://api.quran.com/api/v4/chapters?language=ar`).then(
      (res) => {
        console.log(res)
        setSurahs(res.data.chapters)
      }
    ).catch(function (err) { console.log(err); })
  }

  const addrevision = () => {
    console.log(id,'id')
    console.log(rev_rec,'type')
    console.log(fromsurah,'fromsurah')
    console.log(tosurah,'tosurah')
    console.log(fromayya)
    console.log(toayya)
    console.log(frompage)
    console.log(topage)
    console.log(notes)
    console.log(riwayahname)
    console.log(date)
    console.log(absence_type)

    Api.post(`addrevision`, {
      session_id: id,
      type: rev_rec === 'recite' ? 'recite' : rev_rec === 'revision' ? 'revision' : 'absence',
      surah_from: fromsurah,
      surah_to: tosurah,
      ayyah_from: fromayya,
      ayyah_to: toayya,
      page_from: frompage,
      page_to: topage,
      notes: notes,
      riwayahname: riwayahname,
      date: date,
      absence_type: absence_type
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      if (res.data.success) {
        Swal.fire(res.data.message, '', 'success')
        settype('revision')
        setfromsurah(0)
        settosurah(0)
        setfromayya('')
        settoayya('')
        setnotes('')
        setdate('')
        navigate(-1)
      }
    })
  }

  useEffect(() => {
    getSurahList()
  }, [])

  return (


    <div className='container' style={{ width: '80%' }} >
      <h3 className='my-3 text-center'>{rev_rec === 'recite' ? 'تسميع' : rev_rec === 'revision' ? 'مراجعة' : 'تسجيل غياب '}
      </h3>

      <div className='row'>
        <div className='col-md-6'>
          <label className='my-2'>في تاريخ</label>
          <input className='form-control' type="date" name="date"
            max={moment().format('YYYY-MM-DD')}
            value={date}
            onChange={(e) => setdate(e.target.value)} />
        </div>
        {rev_rec === 'absence' ?
          <div className='col-md-6'>
            <label className='my-2'>هل يوم عذر للغياب</label>
            <select className="form-control" value={absence_type}
              onChange={(e) => setabsence_type(e.target.value)}>
              <option value={0} disabled>نوع الغياب</option>
              <option value='excused'>غياب بعذر</option>
              <option value='unexcused'>غياب بدون عذر</option>
              <option value='teacher_excused'>اعتذر المدرس</option>
            </select>
          </div>
          : ''}
      </div>

      {rev_rec === 'absence' ? '' :
        <>
          <div className='row'>
            <div className='col-md'>
              <label className='my-2' >من سورة</label>
              <select className="form-control" value={fromsurah}
                onChange={(e) => setfromsurah(e.target.value)}>
                <option value={0} disabled>اختر سورة</option>
                {surahs.map((surah) =>
                  <option key={surah.id} value={surah.name_arabic}>
                    {surah.name_arabic}
                  </option>
                )
                }
              </select>
            </div>

            <div className='col-md'>
              <label className='my-2'>من الاية</label>
              <input className='form-control' type="text" name="fromayya"
                value={fromayya}
                onChange={(e) => setfromayya(e.target.value)}
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-md'>
              <label className='my-2'>الى سورة</label>
              <select className="form-control" value={tosurah}
                onChange={(e) => settosurah(e.target.value)}>
                <option value={0} disabled>اختر سورة</option>
                {surahs.map((surah) =>
                  <option key={surah.id} value={surah.name_arabic}>
                    {surah.name_arabic}
                  </option>
                )
                }
              </select>
            </div>

            <div className='col-md'>
              <label className='my-2'>الى الاية</label>
              <input className='form-control' type="text" name="toayya"
                value={toayya}
                onChange={(e) => settoayya(e.target.value)} />
            </div>
          </div>

          <div className='row'>
            <div className='col-md'>
              <label className='my-2'>من صفحة</label>
              <input className="form-control" type="text" value={frompage}
                onChange={(e) => setfrompage(e.target.value)} />

            </div>

            <div className='col-md'>
              <label className='my-2'>الى صفحة</label>
              <input className='form-control' type="text" name="toayya"
                value={topage}
                onChange={(e) => settopage(e.target.value)} />
            </div>
          </div>
        </>
      }

      <div className='row'>
        <div className='col-md'>
          <label className='my-2'>ملاحظات</label>
          <input className='form-control' type="text" name="notes"
            value={notes}
            onChange={(e) => setnotes(e.target.value)} />
        </div>

        {rev_rec === 'absence' ? '' :
          <div className='col-md'>
            <label className='my-2'>القراءة</label>
            <select className="form-control" value={riwayahname}
              onChange={(e) => setriwayahname(e.target.value)}>
              <option value={0} disabled>اختر القراءة</option>
              {riwayat.map((riwayah) =>
                <option key={riwayah.id} value={riwayah.name}>
                  {riwayah.name}
                </option>
              )
              }
            </select>
          </div>
        }
      </div>

      <button className='btn btn-success mt-3' onClick={addrevision}>اضافة</button>
      <NavLink className='btn btn-dark mt-3 mx-2' to={'/sessions'}>الغاء</NavLink>

    </div >
  )
}

export default AddReciteRevision