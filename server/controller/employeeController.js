import pool from '../model/employeeModel.js';

export const getAllEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees ORDER BY createdAt DESC');
    const data = rows.map(r => ({
      _id: String(r.id),
      employeeName: r.employeeName,
      employeeId: r.employeeId,
      department: r.department,
      designation: r.designation,
      project: r.project,
      type: r.type,
      status: r.status,
      profileImage: r.profileImage,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt
    }));
    res.json({ success: true, data, message: 'Employees retrieved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to retrieve employees' } });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Employee not found' } });
    }
    const r = rows[0];
    const data = { _id: String(r.id), employeeName: r.employeeName, employeeId: r.employeeId, department: r.department, designation: r.designation, project: r.project, type: r.type, status: r.status, profileImage: r.profileImage, createdAt: r.createdAt, updatedAt: r.updatedAt };
    res.json({ success: true, data, message: 'Employee retrieved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to retrieve employee' } });
  }
};

export const addEmployee = async (req, res) => {
  try {
    const { employeeName, employeeId, department, designation, project, type, status } = req.body;
    if (!employeeName || !employeeId || !department || !designation || !project || !type || !status) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'All fields are required' } });
    }
    const [dup] = await pool.query('SELECT id FROM employees WHERE employeeId = ?', [employeeId]);
    if (dup.length > 0) {
      return res.status(409).json({ success: false, error: { code: 'DUPLICATE_ERROR', message: 'Employee ID already exists' } });
    }
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;
    const [result] = await pool.execute(
      'INSERT INTO employees (employeeName, employeeId, department, designation, project, type, status, profileImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [employeeName, employeeId, department, designation, project, type, status, profileImage]
    );
    const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [result.insertId]);
    const r = rows[0];
    const data = { _id: String(r.id), employeeName: r.employeeName, employeeId: r.employeeId, department: r.department, designation: r.designation, project: r.project, type: r.type, status: r.status, profileImage: r.profileImage, createdAt: r.createdAt, updatedAt: r.updatedAt };
    res.status(201).json({ success: true, data, message: 'Employee created successfully' });
  } catch (error) {
    if (error && error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, error: { code: 'DUPLICATE_ERROR', message: 'Employee ID already exists' } });
    }
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to create employee' } });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { employeeName, employeeId, department, designation, project, type, status } = req.body;
    if (!employeeName || !employeeId || !department || !designation || !project || !type || !status) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'All fields are required' } });
    }
    const [dup] = await pool.query('SELECT id FROM employees WHERE employeeId = ? AND id <> ?', [employeeId, req.params.id]);
    if (dup.length > 0) {
      return res.status(409).json({ success: false, error: { code: 'DUPLICATE_ERROR', message: 'Employee ID already exists' } });
    }
    const profileImage = req.file ? `/uploads/${req.file.filename}` : undefined;
    const fields = ['employeeName','employeeId','department','designation','project','type','status'];
    const values = [employeeName, employeeId, department, designation, project, type, status];
    let setClause = fields.map(f => `${f} = ?`).join(', ');
    if (profileImage !== undefined) {
      setClause += ', profileImage = ?';
      values.push(profileImage);
    }
    values.push(req.params.id);
    const [result] = await pool.execute(`UPDATE employees SET ${setClause} WHERE id = ?`, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Employee not found' } });
    }
    const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [req.params.id]);
    const r = rows[0];
    const data = { _id: String(r.id), employeeName: r.employeeName, employeeId: r.employeeId, department: r.department, designation: r.designation, project: r.project, type: r.type, status: r.status, profileImage: r.profileImage, createdAt: r.createdAt, updatedAt: r.updatedAt };
    res.json({ success: true, data, message: 'Employee updated successfully' });
  } catch (error) {
    if (error && error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, error: { code: 'DUPLICATE_ERROR', message: 'Employee ID already exists' } });
    }
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to update employee' } });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Employee not found' } });
    }
    await pool.execute('DELETE FROM employees WHERE id = ?', [req.params.id]);
    const r = rows[0];
    const data = { _id: String(r.id), employeeName: r.employeeName, employeeId: r.employeeId, department: r.department, designation: r.designation, project: r.project, type: r.type, status: r.status, profileImage: r.profileImage, createdAt: r.createdAt, updatedAt: r.updatedAt };
    res.json({ success: true, data, message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to delete employee' } });
  }
};

export const searchEmployee = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name || name.trim() === '') {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Search name is required' } });
    }
    const like = `%${name}%`;
    const [rows] = await pool.query('SELECT * FROM employees WHERE employeeName LIKE ? ORDER BY createdAt DESC', [like]);
    const data = rows.map(r => ({ _id: String(r.id), employeeName: r.employeeName, employeeId: r.employeeId, department: r.department, designation: r.designation, project: r.project, type: r.type, status: r.status, profileImage: r.profileImage, createdAt: r.createdAt, updatedAt: r.updatedAt }));
    res.json({ success: true, data, message: 'Search completed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to search employees' } });
  }
};
