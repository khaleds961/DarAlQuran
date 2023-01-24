import React from 'react'

export default function AddStudentForm() {
    return (
        <div>
            <form>
                <div className="form-row">

                    <div className="form-group col-md-6 my-2">
                        <label for="f_name my-2">الاسم الاول</label>
                        <input type="text" className="form-control my-2" id="f_name" />
                    </div>

                    <div className="form-group col-md-6 my-2">
                        <label for="l_name">الاسم الاخير</label>
                        <input type="text" className="form-control my-2" id="l_name" />
                    </div>

                    <div className="form-group col-md-6 my-2">
                        <label for="phone_number">رقم الهاتف</label>
                        <input type="text" className="form-control my-2" id="phone_number" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3"> اضافة</button>
            </form>

        </div>
    )
}
