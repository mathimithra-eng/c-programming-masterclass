import React from 'react';
import { motion } from 'motion/react';

// ── Helpers ──────────────────────────────────────────────────
const Box = ({ children, color = 'bg-blue-100 border-blue-300 text-blue-900', className = '' }) => (
  <div className={`px-5 py-3 rounded-2xl border-2 font-bold text-center ${color} ${className}`}>{children}</div>
);

const Arrow = ({ label = '', vertical = false }) => (
  <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} items-center gap-1 text-slate-400 font-mono text-xs`}>
    {label && <span>{label}</span>}
    <span className={vertical ? 'text-2xl' : 'text-xl'}>{vertical ? '↓' : '→'}</span>
  </div>
);

// ── Individual diagram renderers ───────────────────────────────

function IntrodiagramDiag() {
  const uses = [
    ['🖥️', 'OS Kernels', 'Linux, Windows'],
    ['🔌', 'Embedded', 'Microcontrollers'],
    ['🎮', 'Games', 'Game Engines'],
    ['🛰️', 'Systems', 'Compilers, DBs'],
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
      {uses.map(([icon, title, sub], i) => (
        <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }} className="bg-white border-2 border-blue-200 rounded-2xl p-4 text-center">
          <div className="text-3xl mb-2">{icon}</div>
          <div className="font-bold text-slate-800 text-sm">{title}</div>
          <div className="text-xs text-slate-500">{sub}</div>
        </motion.div>
      ))}
    </div>
  );
}

function TimelineDiag() {
  const events = [
    { year: '1969', label: 'B Language by Ken Thompson' },
    { year: '1972', label: 'C created by Dennis Ritchie' },
    { year: '1978', label: 'K&R C Book Published' },
    { year: '1989', label: 'ANSI C (C89) Standard' },
    { year: '1999', label: 'C99 — new features' },
    { year: '2011', label: 'C11 — modern C' },
  ];
  return (
    <div className="w-full max-w-3xl">
      {events.map((e, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }} className="flex items-center gap-4 mb-3">
          <div className="bg-orange-500 text-white rounded-full px-3 py-1 font-bold font-mono text-sm min-w-[60px] text-center">{e.year}</div>
          <div className="h-0.5 w-4 bg-orange-300" />
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-2 text-orange-900 font-medium text-sm flex-1 text-left">{e.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

function StructureDiag() {
  const parts = [
    { label: '#include <stdio.h>', color: 'bg-purple-100 border-purple-300 text-purple-900', desc: 'Preprocessor directive' },
    { label: 'int main() {', color: 'bg-blue-100 border-blue-300 text-blue-900', desc: 'Entry point' },
    { label: '  // statements', color: 'bg-emerald-100 border-emerald-300 text-emerald-900', desc: 'Your code' },
    { label: '  return 0;', color: 'bg-amber-100 border-amber-300 text-amber-900', desc: 'Exit with success' },
    { label: '}', color: 'bg-blue-100 border-blue-300 text-blue-900', desc: 'End of main' },
  ];
  return (
    <div className="w-full max-w-2xl font-mono text-left">
      {parts.map((p, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12 }}
          className={`flex items-center gap-4 mb-2 px-5 py-3 rounded-2xl border-2 ${p.color}`}>
          <span className="flex-1 font-bold">{p.label}</span>
          <span className="text-xs opacity-60">{p.desc}</span>
        </motion.div>
      ))}
    </div>
  );
}

function VariableDiag() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <div className="flex items-center gap-3 text-2xl font-mono font-bold">
        <span className="text-pink-500">int</span>
        <span className="text-blue-600">age</span>
        <span className="text-slate-500">=</span>
        <span className="text-emerald-500">21</span>
        <span className="text-slate-500">;</span>
      </div>
      <div className="grid grid-cols-3 gap-4 w-full">
        {[
          { label: 'Data Type', val: 'int', color: 'bg-pink-50 border-pink-300 text-pink-800' },
          { label: 'Name', val: 'age', color: 'bg-blue-50 border-blue-300 text-blue-800' },
          { label: 'Value', val: '21', color: 'bg-emerald-50 border-emerald-300 text-emerald-800' },
        ].map((item, i) => (
          <div key={i} className={`p-4 rounded-2xl border-2 text-center ${item.color}`}>
            <div className="font-bold font-mono text-xl">{item.val}</div>
            <div className="text-xs mt-1 opacity-70">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-slate-100 border border-slate-200 rounded-2xl px-6 py-3 text-sm text-slate-600 font-medium">
        📦 Memory: <code className="font-mono text-slate-800">0x7ffd5a → 21</code>
      </div>
    </div>
  );
}

function DataTypesDiag() {
  const types = [
    { type: 'int', bytes: '4 bytes', range: '-2.1B to 2.1B', color: 'bg-blue-50 border-blue-300 text-blue-900' },
    { type: 'float', bytes: '4 bytes', range: '6–7 decimal digits', color: 'bg-emerald-50 border-emerald-300 text-emerald-900' },
    { type: 'double', bytes: '8 bytes', range: '15–16 decimal digits', color: 'bg-purple-50 border-purple-300 text-purple-900' },
    { type: 'char', bytes: '1 byte', range: '-128 to 127', color: 'bg-amber-50 border-amber-300 text-amber-900' },
    { type: 'long', bytes: '8 bytes', range: 'Very large integers', color: 'bg-rose-50 border-rose-300 text-rose-900' },
    { type: 'void', bytes: '0 bytes', range: 'No value / No return', color: 'bg-slate-50 border-slate-300 text-slate-900' },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">
      {types.map((t, i) => (
        <motion.div key={i} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08 }} className={`p-4 rounded-2xl border-2 text-center ${t.color}`}>
          <code className="font-bold text-xl block">{t.type}</code>
          <div className="text-sm font-semibold mt-1">{t.bytes}</div>
          <div className="text-xs opacity-60 mt-1">{t.range}</div>
        </motion.div>
      ))}
    </div>
  );
}

function OperatorsDiag() {
  const groups = [
    {
      title: '🔢 Arithmetic', color: 'bg-amber-50 border-amber-200',
      ops: ['+', '-', '*', '/', '%', '++', '--'],
    },
    {
      title: '⚖️ Relational', color: 'bg-blue-50 border-blue-200',
      ops: ['==', '!=', '>', '<', '>=', '<='],
    },
    {
      title: '🔗 Logical', color: 'bg-purple-50 border-purple-200',
      ops: ['&&', '||', '!'],
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
      {groups.map((g, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }} className={`p-6 rounded-2xl border-2 ${g.color} text-left`}>
          <div className="font-bold text-lg mb-4">{g.title}</div>
          <div className="flex flex-wrap gap-2">
            {g.ops.map(op => (
              <code key={op} className="bg-white px-3 py-1 rounded-lg font-mono font-bold text-slate-800 border border-slate-200 text-sm">{op}</code>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function FlowchartDiag() {
  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-xs">
      <Box color="bg-blue-100 border-blue-300 text-blue-900" className="w-full">START</Box>
      <Arrow vertical />
      <Box color="bg-amber-100 border-amber-300 text-amber-900" className="w-full rounded-full">Condition?</Box>
      <div className="flex gap-8 items-start w-full justify-center">
        <div className="flex flex-col items-center gap-2">
          <span className="text-emerald-600 font-bold text-sm">TRUE</span>
          <Arrow vertical />
          <Box color="bg-emerald-100 border-emerald-300 text-emerald-900">if block</Box>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-rose-600 font-bold text-sm">FALSE</span>
          <Arrow vertical />
          <Box color="bg-rose-100 border-rose-300 text-rose-900">else block</Box>
        </div>
      </div>
      <Arrow vertical />
      <Box color="bg-slate-100 border-slate-300 text-slate-800" className="w-full">END</Box>
    </div>
  );
}

function LoopDiag() {
  const loops = [
    { name: 'for', use: 'Known count', color: 'bg-indigo-50 border-indigo-300 text-indigo-900' },
    { name: 'while', use: 'Unknown count', color: 'bg-violet-50 border-violet-300 text-violet-900' },
    { name: 'do-while', use: 'At least once', color: 'bg-purple-50 border-purple-300 text-purple-900' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
      {loops.map((l, i) => (
        <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.12 }} className={`p-6 rounded-2xl border-2 text-center ${l.color}`}>
          <code className="font-bold text-2xl block mb-2">{l.name}</code>
          <div className="text-sm opacity-70">{l.use}</div>
        </motion.div>
      ))}
    </div>
  );
}

function ArraysDiag() {
  const cells = [85, 92, 78, 96, 88];
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
      <code className="text-lg font-mono text-slate-700">int scores[5] = {'{85, 92, 78, 96, 88}'};</code>
      <div className="flex gap-2">
        {cells.map((val, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }} className="flex flex-col items-center">
            <div className="w-14 h-14 bg-blue-100 border-2 border-blue-400 rounded-xl flex items-center justify-center font-bold text-blue-900 text-lg font-mono">{val}</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">[{i}]</div>
          </motion.div>
        ))}
      </div>
      <div className="text-sm text-slate-500">← Index starts at 0, ends at length−1 →</div>
    </div>
  );
}

function StringsDiag() {
  const chars = ['H', 'e', 'l', 'l', 'o', '\\0'];
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
      <code className="text-lg font-mono text-slate-700">char name[] = "Hello";</code>
      <div className="flex gap-2">
        {chars.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex flex-col items-center`}>
            <div className={`w-12 h-12 border-2 rounded-xl flex items-center justify-center font-bold font-mono text-lg
              ${c === '\\0' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-emerald-100 border-emerald-400 text-emerald-900'}`}>{c}</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">[{i}]</div>
          </motion.div>
        ))}
      </div>
      <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-2 text-rose-800 text-sm font-medium">
        ⚠️ <code>\0</code> = Null Terminator — marks end of string!
      </div>
    </div>
  );
}

function FunctionsDiag() {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
      <div className="grid grid-cols-3 gap-4 w-full text-center">
        {[
          { label: 'return type', color: 'bg-pink-100 border-pink-300 text-pink-800', ex: 'int' },
          { label: 'function name', color: 'bg-blue-100 border-blue-300 text-blue-800', ex: 'add' },
          { label: 'parameters', color: 'bg-emerald-100 border-emerald-300 text-emerald-800', ex: '(int a, int b)' },
        ].map((item, i) => (
          <div key={i} className={`p-4 rounded-2xl border-2 ${item.color}`}>
            <code className="font-bold text-base block">{item.ex}</code>
            <div className="text-xs mt-1 opacity-70">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-4 font-mono text-slate-800 text-sm w-full text-left">
        <span className="text-pink-500">int </span>
        <span className="text-blue-600">add</span>
        <span className="text-slate-600">(</span>
        <span className="text-pink-500">int </span>
        <span className="text-slate-800">a, </span>
        <span className="text-pink-500">int </span>
        <span className="text-slate-800">b) {'{'}<br />
        </span>
        <span className="text-slate-400">  &nbsp;&nbsp;</span>
        <span className="text-pink-500">return </span>
        <span className="text-slate-800">a + b;<br />{'}'}</span>
      </div>
    </div>
  );
}

function PointersDiag() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
      <div className="grid grid-cols-2 gap-6 w-full">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 text-left">
          <div className="font-bold text-blue-900 mb-2 text-sm">Variable</div>
          <code className="text-2xl font-mono font-bold text-blue-700">age = 21</code>
          <div className="text-xs text-blue-500 mt-2">Address: 0x7ffd5a</div>
        </div>
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-5 text-left">
          <div className="font-bold text-orange-900 mb-2 text-sm">Pointer</div>
          <code className="text-2xl font-mono font-bold text-orange-700">ptr → 0x7ffd5a</code>
          <div className="text-xs text-orange-500 mt-2">Stores address of age</div>
        </div>
      </div>
      <div className="flex items-center gap-3 font-mono text-sm">
        <code className="bg-slate-800 text-green-400 px-3 py-2 rounded-lg">int *ptr = &age;</code>
        <Arrow />
        <code className="bg-slate-800 text-green-400 px-3 py-2 rounded-lg">*ptr == 21</code>
      </div>
    </div>
  );
}

function StructureDiag2() {
  return (
    <div className="w-full max-w-2xl">
      <div className="bg-slate-800 rounded-2xl p-6 font-mono text-sm text-left">
        <div className="text-pink-400">struct <span className="text-yellow-300">Student</span> {'{'}</div>
        <div className="pl-6">
          <div><span className="text-blue-300">char </span><span className="text-white">name[50];</span><span className="text-slate-500"> // string</span></div>
          <div><span className="text-blue-300">int </span><span className="text-white">rollNo;</span><span className="text-slate-500">  // integer</span></div>
          <div><span className="text-blue-300">float </span><span className="text-white">marks;</span><span className="text-slate-500">   // decimal</span></div>
        </div>
        <div className="text-white">{'};'}</div>
        <div className="mt-3">
          <span className="text-pink-400">struct </span>
          <span className="text-yellow-300">Student </span>
          <span className="text-white">s1 = </span>
          <span className="text-orange-300">{'{"Ravi", 101, 92.5}'}</span>
          <span className="text-white">;</span>
        </div>
        <div>
          <span className="text-white">s1.</span>
          <span className="text-blue-300">name </span>
          <span className="text-slate-500">// → "Ravi"</span>
        </div>
      </div>
    </div>
  );
}

function MemoryDiag() {
  const fns = [
    { fn: 'malloc()', desc: 'Allocate memory', color: 'bg-blue-50 border-blue-300 text-blue-900' },
    { fn: 'calloc()', desc: 'Alloc + zero init', color: 'bg-emerald-50 border-emerald-300 text-emerald-900' },
    { fn: 'realloc()', desc: 'Resize allocation', color: 'bg-amber-50 border-amber-300 text-amber-900' },
    { fn: 'free()', desc: 'Release memory ⚠️', color: 'bg-rose-50 border-rose-300 text-rose-900' },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
      {fns.map((f, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }} className={`p-5 rounded-2xl border-2 text-center ${f.color}`}>
          <code className="font-bold text-lg block mb-1">{f.fn}</code>
          <div className="text-xs opacity-70">{f.desc}</div>
        </motion.div>
      ))}
    </div>
  );
}

function FileDiag() {
  const steps = [
    { label: 'fopen()', icon: '📂', desc: 'Open file', color: 'bg-blue-50 border-blue-200' },
    { label: 'fprintf() / fscanf()', icon: '✍️', desc: 'Read / Write', color: 'bg-emerald-50 border-emerald-200' },
    { label: 'fclose()', icon: '💾', desc: 'Save & close', color: 'bg-amber-50 border-amber-200' },
  ];
  return (
    <div className="flex items-center gap-4 flex-wrap justify-center w-full max-w-3xl">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }} className={`p-5 rounded-2xl border-2 text-center ${s.color} min-w-[120px]`}>
            <div className="text-3xl mb-2">{s.icon}</div>
            <code className="font-bold text-sm block">{s.label}</code>
            <div className="text-xs text-slate-500 mt-1">{s.desc}</div>
          </motion.div>
          {i < steps.length - 1 && <Arrow />}
        </React.Fragment>
      ))}
    </div>
  );
}

function EnumDiag() {
  return (
    <div className="w-full max-w-2xl">
      <div className="bg-slate-800 rounded-2xl p-6 font-mono text-sm text-left">
        <div><span className="text-pink-400">enum </span><span className="text-yellow-300">Day </span><span className="text-white">{'{'}</span></div>
        <div className="pl-6">
          {['MONDAY = 0', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map((d, i) => (
            <div key={i}><span className="text-orange-300">{d}</span><span className="text-white">{i < 6 ? ',' : ''}</span></div>
          ))}
        </div>
        <div className="text-white">{'};'}</div>
        <div className="mt-3">
          <span className="text-pink-400">enum </span>
          <span className="text-yellow-300">Day </span>
          <span className="text-white">today = </span>
          <span className="text-orange-300">FRIDAY</span>
          <span className="text-white">; </span>
          <span className="text-slate-500">// = 4</span>
        </div>
      </div>
    </div>
  );
}

function RecursionDiag() {
  const steps = [5, 4, 3, 2, 1, 0];
  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-sm">
      {steps.map((n, i) => (
        <motion.div key={n} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3 w-full" style={{ paddingLeft: `${i * 12}px` }}>
          <div className={`flex-1 p-3 rounded-xl border-2 text-sm font-mono text-center
            ${n === 0 ? 'bg-emerald-100 border-emerald-400 text-emerald-800 font-bold' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
            {n === 0 ? 'factorial(0) = 1 ← BASE CASE' : `factorial(${n}) = ${n} × factorial(${n - 1})`}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Main Diagram component ─────────────────────────────────────
export default function Diagram({ type }) {
  const map = {
    intro: <IntrodiagramDiag />,
    timeline: <TimelineDiag />,
    structure: <StructureDiag />,
    variable: <VariableDiag />,
    datatypes: <DataTypesDiag />,
    operators: <OperatorsDiag />,
    flowchart: <FlowchartDiag />,
    loop: <LoopDiag />,
    arrays: <ArraysDiag />,
    strings: <StringsDiag />,
    functions: <FunctionsDiag />,
    pointers: <PointersDiag />,
    struct: <StructureDiag2 />,
    memory: <MemoryDiag />,
    files: <FileDiag />,
    enum: <EnumDiag />,
    recursion: <RecursionDiag />,
  };
  return map[type] || null;
}
