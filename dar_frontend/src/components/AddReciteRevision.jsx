import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Api from '../Api'
import SideBar from './SideBar'
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function AddReciteRevision() {

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
  const [surahs, setSurahs] = useState([])
  const [surahname, setSurahName] = useState([])
  const [fromayya, setfromayya] = useState()
  const [toayya, settoAyya] = useState()
  const [frompage, setfrompage] = useState()
  const [notes, setnotes] = useState()
  const theme = useTheme();

  const getSurahList = () => {
    Api.get(`https://api.quran.com/api/v4/chapters?language=ar`).then(
      (res) => {
        setSurahs(res.data.chapters)
      }
    ).catch(function (err) { console.log(err); })
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSurahName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  }

  function getStyles(name, surahname, theme) {
    return {
      fontWeight:
        surahname.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const onSubmit = (e) =>{
    e.preventDefault();
    const surahname_string = surahname.toString();
    Api.post('')
    // Api.post()
  }

  useEffect(() => {
    getSurahList()
  }, [])

  return (
    <div className="container-fluid rtl">
      <div className="row flex-nowrap">
        <SideBar />
        <div className="col py-3" style={{ background: '#EEEEEE' }}>
          <h3 className='mb-5'>مراجعة و تسميع</h3>

          <div className='container'>
            <form>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">اختر السورة</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={surahname}
                onChange={handleChange}
                input={<OutlinedInput label="اسماء السور" />}
                MenuProps={MenuProps}
              >
                {surahs.map((surah) => (
                  <MenuItem
                    key={surah.name_arabic}
                    value={surah.name_arabic}
                    style={getStyles(surah.name_arabic, surahname, theme)}
                  >
                    {surah.name_arabic}
                  </MenuItem>
                ))}
              </Select>
              <div className='mt-3'>
                <label>من الاية</label>
                <input className='form-control' type="text" name="fromayya"
                onChange={(e) =>setfromayya(e.target.value)}
                 />
              </div>

              <div className='mt-3'>
                <label>الى الاية</label>
                <input className='form-control' type="text" name="toayya" />
              </div>

              <div className='mt-3'>
                <label>من الصفحة</label>
                <input className='form-control' type="text" name="frompage" />
              </div>

              <div className='mt-3'>
                <label>الى الصفحة</label>
                <input className='form-control' type="text" name="topage" />
              </div>

              <div className='mt-3'>
                <label>ملاحظات</label>
                <input className='form-control' type="text" name="notes" />
              </div>
              <button className='btn btn-success mt-3' onClick={onSubmit}>اضافة</button>
            </FormControl>
            </form>
          </div>

        </div>

      </div>
    </div>
  )
}

export default AddReciteRevision