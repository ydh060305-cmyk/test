const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3398;

app.use(express.urlencoded({ extended: true }));
// POST /todo/1?_method=PUT → PUT /todo/1 로 처리
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// 메모리 저장 (서버 재시작 시 초기화)
let todos = [
  { id: 1, text: '아침 운동하기' },
  { id: 2, text: '이메일 확인하기' },
  { id: 3, text: '장보기' },
];
let nextId = 4;

app.get('/todo', (req, res) => {
  res.json(todos);
});

app.post('/todo', (req, res) => {
  const text = (req.body.text || '').trim();
  if (text) todos.push({ id: nextId++, text });
  res.redirect('/');
});
// 투두 리스트 수정 (PUT 라우트)

app.put('/todo/:id', (req, res) => {
  const id = Number(req.params.id);
  const newText = (req.body.text || '').trim();
todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, text: newText };
    }
    return todo;
  });
 
app.delete('/todo/:id', (req, res) => {
  const id = Number(req.params.id);
todos = todos.filter(todo => todo.id !== id);

  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
