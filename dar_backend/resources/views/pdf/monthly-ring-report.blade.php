<!DOCTYPE html>
<html>
<style>
    * {
        font-family: DejaVu Sans, sans-serif;
        direction: rtl;
        text-align: right;
    }
</style>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Monthly Ring Report</title>
</head>

<body>

    <table>
        <thead>
            <tr>
                <th>Student Name</th>
                <th>Revision Date</th>
                <th>From Surrah</th>
                <th>To Surrah</th>
                <th>From Ayyah</th>
                <th>To Ayyah</th>
                <th>Attendance</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($students as $student)
            <tr>
                <td>{{ $student->full_name }}</td>
                <td colspan="7"></td>
            </tr>
            <tr>
                <td></td>
                <td><strong>Revision Date</strong></td>
                <td><strong>From Surrah</strong></td>
                <td><strong>To Surrah</strong></td>
                <td><strong>From Ayyah</strong></td>
                <td><strong>To Ayyah</strong></td>
                <td><strong>Attendance</strong></td>
                <td><strong>Type</strong></td>
            </tr>
            @foreach ($student->sessions as $session)
            <tr>
                <td></td>
                <td>{{ $session->revision_date }}</td>
                <td>{{ $session->from_surrah }}</td>
                <td>{{ $session->to_surrah }}</td>
                <td>{{ $session->from_ayyah }}</td>
                <td>{{ $session->to_ayyah }}</td>
                <td>{{ $session->attendance }}</td>
                <td>{{ $session->type }}</td>
            </tr>
            @endforeach
            @endforeach
        </tbody>
    </table>
</body>

</html>