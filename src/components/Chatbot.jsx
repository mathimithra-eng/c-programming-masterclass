import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, User } from 'lucide-react';

/* ── Navy blue / cyan theme ── */
const T = {
  bg:        '#001233',
  panel:     '#000e24',
  border:    'rgba(14,165,233,0.18)',
  accent1:   '#0ea5e9',
  accent2:   '#38bdf8',
  accent3:   '#7dd3fc',
  text:      '#bae6fd',
  muted:     '#3d6a8a',
  codeBg:    '#000c1d',
  codeGreen: '#4ade80',
};

/* ─── Comprehensive C Knowledge Base ─────────────────── */
const C_KNOWLEDGE = {
  greetings: {
    keys: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'namaste', 'vanakkam', 'who are you', 'about you'],
    answer: `Hello! 👋 I'm your **C Programming AI Tutor**!\n\nI can help you with anything about C — from the basics to advanced topics:\n- **Variables**, **Data Types**, **Operators**\n- **Loops**, **Functions**, **Arrays**, **Strings**\n- **Pointers** & **Memory Management**\n- **Structures**, **File Handling** & more!\n\nJust ask me anything! 🚀`,
  },
  whatIsC: {
    keys: ['what is c', 'about c', 'c language', 'c programming language', 'who created c', 'dennis ritchie', 'history of c', 'origin of c', 'why learn c', 'features of c', 'importance of c', 'mid-level language', 'mother of all languages'],
    answer: `**C — The Foundation of Modern Computing** 🏗️\n\nDeveloped by **Dennis Ritchie** at Bell Labs in **1972**, C is a general-purpose, procedural programming language focusing on efficiency and hardware access.`,
    subQuestions: [
      'Why is C a Mid-Level language?',
      'Who created C?',
      'Is C the Mother of all languages?',
      'What are the main features of C?',
      'Where is C used today?'
    ]
  },
  q_c_mid: {
    keys: ['why is c a mid-level language', 'mid-level'],
    answer: `C is called **"Mid-Level"** because it bridges the gap between low-level (assembly) and high-level (Java/Python) languages, offering hardware access with readable syntax.`
  },
  q_c_creator: {
    keys: ['who created c'],
    answer: `**Dennis Ritchie** created C in 1972 at AT&T Bell Labs to rewrite the Unix Operating System.`
  },
  q_c_mother: {
    keys: ['mother language', 'mother of all languages'],
    answer: `C is considered the **"Mother of all Languages"** because its syntax and core concepts are the foundation for C++, Java, C#, and JavaScript.`
  },
  q_c_features: {
    keys: ['main features of c', 'characteristics of c'],
    answer: `Main features of C: **Speed**, **Portability**, **Modularity**, and a rich set of **Built-in Operators**.`
  },
  q_c_usage: {
    keys: ['where is c used today', 'usage of c'],
    answer: `C is used today in **OS kernels** (Linux/Windows), **Embedded systems**, **Compilers**, and **Databases** (MySQL).`
  },

  helloWorld: {
    keys: ['hello world', 'first program', 'basic structure', 'main function', 'stdio.h', 'printf', 'simplest program', 'how to run c', 'scanf', 'comment', 'header file'],
    answer: `**Your First C Program: Hello World!** 🌎\n\nEvery C program follows a standard structure involving header files and an entry point called \`main()\`.`,
    subQuestions: [
      'What is #include <stdio.h>?',
      'What does int main() signify?',
      'Why do we use return 0?',
      'What is a literal in C?',
      'How do I add comments in C?'
    ]
  },
  q_stdio: {
    keys: ['what is #include <stdio.h>', 'stdio.h'],
    answer: `\`#include <stdio.h>\` is a preprocessor command that tells the compiler to include the **Standard Input/Output** header file for functions like \`printf()\` and \`scanf()\`.`
  },
  q_main: {
    keys: ['what does int main() signify', 'main function signify'],
    answer: `\`int main()\` is the **entry point** of every C program. Execution starts here.`
  },
  q_return0: {
    keys: ['why do we use return 0', 'return 0'],
    answer: `\`return 0;\` tells the Operating System that the program finished successfully. Any other value indicates an error.`
  },
  q_literal: {
    keys: ['what is a literal'],
    answer: `A **Literal** is a fixed value that cannot be changed (e.g., the string "Hello" or the number 42).`
  },
  q_comments: {
    keys: ['how do i add comments in c', 'add comments'],
    answer: `C uses two types of comments:\n- **Single line:** \`// text\`\n- **Multi-line:** \`/* text */\``
  },

  dataTypes: {
    keys: ['data type', 'int', 'float', 'char', 'double', 'void', 'short', 'long', 'signed', 'unsigned', 'size of', 'primitives', 'derived', 'user-defined', 'range of data type'],
    answer: `**Data Types: The Building Blocks of C** 🧱\n\nC uses data types to tell the compiler what kind of data is being stored and how much memory to allocate.`,
    subQuestions: [
      'What are the 3 main categories of types?',
      'Difference between float and double?',
      'What is the void type?',
      'What is the sizeof() operator?',
      'Signed vs Unsigned types?'
    ]
  },
  q_type_categories: {
    keys: ['3 main categories of types'],
    answer: `The 3 categories are:\n- **Primary:** int, float, char, double\n- **Derived:** Array, Pointer, Structure\n- **User-defined:** enum, typedef`
  },
  q_float_double: {
    keys: ['difference between float and double'],
    answer: `**Float** (4 bytes) has 6-7 digit precision, while **Double** (8 bytes) has 15-16 digit precision.`
  },
  q_void: {
    keys: ['what is the void type', 'void type'],
    answer: `**Void** represents "no value" or "no type." It is commonly used for functions that do not return any value.`
  },
  q_sizeof: {
    keys: ['what is the sizeof() operator', 'sizeof()'],
    answer: `\`sizeof()\` is an operator that returns the size (in bytes) of a variable or data type on your system.`
  },
  q_signed_unsigned: {
    keys: ['signed vs unsigned types', 'unsigned'],
    answer: `**Signed** can store both negative and positive values. **Unsigned** stores only positive values (starting from 0), which doubles the maximum positive range.`
  },

  variables: {
    keys: ['variable', 'declaration', 'definition', 'initialize', 'const', 'static', 'extern', 'auto', 'register', 'scope', 'global', 'local', 'naming rules', 'identifiers'],
    answer: `**Variables & Scopes in C** 🧬\n\nA variable is a named storage location in memory. C distinguishes between where a variable is declared and its scope.`,
    subQuestions: [
      'Local vs Global variables?',
      'Naming rules for C variables',
      'Declaration vs Definition?',
      'What is a const variable?',
      'What is a static variable?'
    ]
  },
  q_local_global: {
    keys: ['local vs global variables', 'global variable'],
    answer: `**Local** variables are declared inside a function and accessible only there. **Global** variables are declared outside all functions and accessible everywhere.`
  },
  q_var_rules: {
    keys: ['naming rules for c variables', 'variable naming'],
    answer: `Rules: Must start with a letter or underscore (\`_\`). Cannot use keywords (like \`int\`). Case-sensitive.`
  },
  q_decl_def: {
    keys: ['declaration vs definition'],
    answer: `**Declaration** tells the name and type (\`extern int x;\`). **Definition** allocates memory and optionally initializes (\`int x = 10;\`).`
  },
  q_const: {
    keys: ['what is a const variable', 'const'],
    answer: `A **const** variable is read-only. its value cannot be modified after it is initialized.`
  },
  q_static: {
    keys: ['what is a static variable', 'static variable'],
    answer: `A **static** local variable retains its value even after the function finishes its execution.`
  },
  operators: {
    keys: ['operator', 'arithmetic', 'relational', 'logical', 'bitwise', 'assignment', 'increment', 'decrement', 'precedence', 'ternary', 'modulus', 'associativity', 'comma operator'],
    answer: `**C Operators: Logic & Math** ⚡\n\nOperators are symbols that tell the compiler to perform specific mathematical or logical functions.`,
    subQuestions: [
      'What is Operator Precedence?',
      'Difference between i++ and ++i?',
      'What is the Ternary Operator?',
      'Difference between = and ==?',
      'What is the Modulus operator (%)?'
    ]
  },
  q_precedence: {
    keys: ['what is operator precedence', 'precedence'],
    answer: `**Operator Precedence** determines the order in which operators are evaluated in an expression (e.g., multiplication is done before addition).`
  },
  q_inc_dec: {
    keys: ['difference between i++ and ++i', 'i++ vs ++i'],
    answer: `**i++** (Postfix) uses the current value then increments. **++i** (Prefix) increments the value first and then uses it.`
  },
  q_ternary: {
    keys: ['what is the ternary operator', 'ternary'],
    answer: `The **Ternary Operator** (\`?:\`) is a shorthand for if-else: \`condition ? value_if_true : value_if_false;\`.`
  },
  q_assign_equal: {
    keys: ['difference between = and =='],
    answer: `\`=\` is the **Assignment** operator (sets a value). \`==\` is a **Relational** operator (compares two values).`
  },
  q_modulus: {
    keys: ['what is the modulus operator', 'modulus'],
    answer: `The **Modulus operator** (\`%\`) returns the remainder of an integer division (e.g., \`10 % 3 = 1\`). It does NOT work with floats!`
  },

  conditionals: {
    keys: ['if', 'else', 'switch', 'case', 'default', 'conditional', 'if else', 'nested if', 'selection', 'fall through'],
    answer: `**Conditionals: Decision Making** 🚦\n\nConditional statements allow your program to execute different code blocks based on specific conditions.`,
    subQuestions: [
      'if-else vs switch?',
      'What is Fall-through in switch?',
      'Can I use float in switch?',
      'What is the default case?',
      'What is a nested if-else?'
    ]
  },
  q_if_switch: {
    keys: ['if-else vs switch', 'switch vs if'],
    answer: `**Switch** is faster and cleaner for multiple fixed values (like a menu). **If-else** is better for ranges, logical conditions, and complex comparisons.`
  },
  q_fallthrough: {
    keys: ['what is fall-through in switch', 'fall-through'],
    answer: `**Fall-through** occurs when a \`break\` statement is missing in a switch case, causing execution to continue into the next case automatically.`
  },
  q_switch_types: {
    keys: ['can i use float in switch', 'switch constants'],
    answer: `No. In C, the switch expression must result in an **integer** or **character** constant. Floats and strings are not allowed.`
  },
  q_default_case: {
    keys: ['what is the default case', 'default case'],
    answer: `The **default** case in a switch statement runs if none of the defined cases match the expression. It acts like the final \`else\` in an if-chain.`
  },
  q_nested_if: {
    keys: ['what is a nested if-else', 'nested if'],
    answer: `A **nested if-else** is one conditional structure inside another, used to check multiple levels of conditions.`
  },

  loops: {
    keys: ['loop', 'for loop', 'while loop', 'do while', 'break', 'continue', 'nested loop', 'infinite loop', 'iteration', 'sentinel'],
    answer: `**Loops: Repeat Until Done** 🔁\n\nLoops are used to execute a block of code multiple times as long as a condition is met.`,
    subQuestions: [
      'for vs while vs do-while?',
      'Difference between break and continue?',
      'What is an infinite loop?',
      'What is an empty for loop?',
      'What is a nested loop?'
    ]
  },
  q_loop_types: {
    keys: ['for vs while vs do-while'],
    answer: `**for**: Best when you know the count. **while**: Best for condition-based repeats. **do-while**: Guaranteed to run at least once.`
  },
  q_break_continue: {
    keys: ['difference between break and continue'],
    answer: `**break** exits the loop entirely. **continue** skips the rest of the current iteration and jumps to the next one.`
  },
  q_infinite_loop: {
    keys: ['what is an infinite loop', 'infinite loop'],
    answer: `An **infinite loop** never meets its exit condition (e.g., \`while(1)\`). You usually need to stop it manually with \`Ctrl+C\`.`
  },
  q_empty_for: {
    keys: ['what is an empty for loop', 'for(;;)'],
    answer: `In C, \`for(;;)\` is a perfectly valid way to write an infinite loop. It has no initialization, condition, or increment.`
  },
  q_nested_loop: {
    keys: ['what is a nested loop', 'nested loop'],
    answer: `A **nested loop** is a loop inside another loop body. It's commonly used for working with 2D arrays (matrices) or printing patterns.`
  },
  functions: {
    keys: ['function', 'prototype', 'return type', 'parameter', 'argument', 'pass by value', 'call by reference', 'recursion', 'recursive', 'actual', 'formal', 'scope'],
    answer: `**Functions: Modularity & Reuse** 🧩\n\nFunctions are self-contained blocks of code that perform specific tasks, helping to organize programs and avoid repetition.`,
    subQuestions: [
      'What is a Function Prototype?',
      'Pass by Value vs Pass by Reference?',
      'Actual vs Formal parameters?',
      'Can a function return multiple values?',
      'What is a library function?'
    ]
  },
  q_func_proto: {
    keys: ['what is a function prototype', 'function prototype'],
    answer: `A **Function Prototype** is a declaration that tells the compiler the function's name, return type, and parameters before it's used in the code.`
  },
  q_val_ref: {
    keys: ['pass by value vs pass by reference', 'call by reference'],
    answer: `**Pass by Value** sends a copy of the data (original is safe). **Pass by Reference** sends the memory address (original can be modified).`
  },
  q_param_types: {
    keys: ['actual vs formal parameters'],
    answer: `**Actual Parameters** are the real values passed during the call. **Formal Parameters** are the variables defined in the function header.`
  },
  q_func_return: {
    keys: ['can a function return multiple values'],
    answer: `A function cannot return multiple values directly, but you can achieve this using **pointers** or by returning a **struct**.`
  },
  q_builtin_func: {
    keys: ['what is a library function', 'builtin function'],
    answer: `**Library functions** (like \`printf\`, \`scanf\`) are pre-defined functions stored in C header files that you can use without writing them yourself.`
  },

  recursion: {
    keys: ['recursion', 'recursive', 'factorial', 'fibonacci', 'base case', 'stack overflow', 'call stack', 'tail recursion', 'iteration vs recursion'],
    answer: `**Recursion: Functions calling themselves** 🌀\n\nRecursion is a technique where a function calls itself to solve a smaller version of the same problem.`,
    subQuestions: [
      'What is a Base Case?',
      'What is Stack Overflow?',
      'Recursion vs Iteration?',
      'What is Tail Recursion?',
      'Example: Recursive Factorial'
    ]
  },
  q_base_case: {
    keys: ['what is a base case', 'base case'],
    answer: `The **Base Case** is the condition that stops the recursion. Without it, the function would call itself forever.`
  },
  q_stack_overflow: {
    keys: ['what is stack overflow', 'stack overflow'],
    answer: `**Stack Overflow** occurs when recursion goes too deep, consuming all the memory allocated for the function call stack.`
  },
  q_recur_iter: {
    keys: ['recursion vs iteration', 'iteration vs recursion'],
    answer: `**Recursion** is often cleaner and easier for complex problems (like trees), but **Iteration** is usually faster and uses less memory.`
  },
  q_tail_recur: {
    keys: ['what is tail recursion', 'tail recursion'],
    answer: `**Tail Recursion** is when the recursive call is the very last thing the function does. Some compilers can optimize this to be as fast as a loop.`
  },
  q_recur_fact: {
    keys: ['example recursive factorial', 'recursive factorial'],
    answer: `Factorial Example:\n\`int fact(int n) { if(n <= 1) return 1; return n * fact(n-1); }\``
  },

  arrays: {
    keys: ['array', 'arrays', '2d array', 'matrix', 'index', 'subscript', 'array of pointers', 'multidimensional', 'bounds', 'initialization'],
    answer: `**Arrays: Fixed-size Collections** 🧺\n\nArrays allow you to store multiple elements of the same data type in contiguous memory locations.`,
    subQuestions: [
      'Why start at index 0?',
      'What is a 2D Array?',
      'Does C check array bounds?',
      'How to pass an array to a function?',
      'Arrays vs Pointers'
    ]
  },
  q_array_zero: {
    keys: ['why start at index 0', 'zero indexing'],
    answer: `Indexing starts at **0** because the index represents the "offset" from the beginning of the array in memory.`
  },
  q_2d_array: {
    keys: ['what is a 2d array', 'matrix'],
    answer: `A **2D Array** is essentially an array of arrays, often used to represent grids, tables, or mathematical matrices.`
  },
  q_array_bounds: {
    keys: ['does c check array bounds', 'array bounds'],
    answer: `No. C does **not** check bounds. If you access \`arr[50]\` on a size-10 array, it will access invalid memory (Undefined Behavior).`
  },
  q_pass_array: {
    keys: ['how to pass an array to a function'],
    answer: `In C, you pass an array to a function by passing its name (which is a pointer) and usually its size as a separate parameter.`
  },
  q_array_ptr: {
    keys: ['arrays vs pointers', 'pointer vs array'],
    answer: `An array name acts as a constant pointer to its first element. For example, \`arr[i]\` is internally treated as \`*(arr + i)\`.`
  },

  strings: {
    keys: ['string', 'char array', 'strlen', 'strcpy', 'strcat', 'strcmp', 'null terminator', 'gets', 'puts', 'sprintf', 'sscanf', 'fgets', 'string.h'],
    answer: `**Strings: Sequences of Characters** 🧵\n\nIn C, strings are simply arrays of characters ending with a special null character (\`\\0\`).`,
    subQuestions: [
      'What is the Null Terminator?',
      'How to read strings with spaces?',
      'strlen() vs sizeof()?',
      'How to compare strings?',
      'char s[] vs char *p'
    ]
  },
  q_null_char: {
    keys: ['what is the null terminator', 'null terminator'],
    answer: `The **Null Terminator** (\`\\0\`) is a character with ASCII value 0 that marks the end of a string in memory.`
  },
  q_string_input: {
    keys: ['how to read strings with spaces', 'string with spaces'],
    answer: `Use \`fgets(str, size, stdin)\` to read strings with spaces. Avoid \`scanf("%s")\` as it stops at the first whitespace.`
  },
  q_strlen_sizeof: {
    keys: ['strlen vs sizeof'],
    answer: `\`strlen()\` returns the number of characters (excluding \`\\0\`). \`sizeof()\` returns the total memory size (including \`\\0\`).`
  },
  q_strcmp: {
    keys: ['how to compare strings', 'strcmp'],
    answer: `Use \`strcmp(s1, s2)\`. It returns \`0\` if strings are identical, a positive value if \`s1 > s2\`, and negative if \`s1 < s2\`.`
  },
  q_string_ptr: {
    keys: ['char s[] vs char *p', 'string pointer'],
    answer: `\`char s[]\` is an array (modifiable memory). \`char *p\` is a pointer to a string literal (often read-only memory).`
  },
  structs: {
    keys: ['struct', 'structure', 'union', 'typedef', 'arrow operator', 'dot operator', 'nested struct', 'array of struct', 'padding', 'alignment'],
    answer: `**Structures & Unions: Grouping Data** 📦\n\nStructures allow you to combine different data types into a single unit, which is essential for representing complex data.`,
    subQuestions: [
      'What is struct vs union?',
      'What is the Arrow Operator (->)?',
      'What is Structure Padding?',
      'What is typedef with structs?',
      'What is a Nested Structure?'
    ]
  },
  q_struct_union: {
    keys: ['struct vs union', 'union vs struct'],
    answer: `**struct**: Each member has its own memory; total size is the sum of members (+ padding). **union**: Members share the same memory; total size is the size of the largest member.`
  },
  q_arrow_op: {
    keys: ['what is the arrow operator', 'arrow operator', '->'],
    answer: `The **Arrow Operator** (\`->\`) is used to access structure members through a **pointer**. \`ptr->member\` is a shortcut for \`(*ptr).member\`.`
  },
  q_struct_padding: {
    keys: ['what is structure padding', 'padding', 'alignment'],
    answer: `**Padding** is the insertion of extra idle bytes by the compiler between structure members to align them with memory boundaries for faster CPU access.`
  },
  q_typedef_struct: {
    keys: ['what is typedef with structs', 'typedef struct'],
    answer: `**typedef** creates a nickname for a structure, allowing you to declare variables without repeating the word \`struct\` (e.g., \`Student s1;\` instead of \`struct Student s1;\`).`
  },
  q_nested_struct: {
    keys: ['what is a nested structure', 'nested struct'],
    answer: `A **Nested Structure** is a structure contained within another structure as one of its members.`
  },

  pointers: {
    keys: ['pointer', 'pointers', 'address', 'dereference', 'null pointer', 'void pointer', 'dangling pointer', 'pointer arithmetic', 'pointer to pointer', 'double pointer', '**', '&', 'wild pointer'],
    answer: `**Pointers: Direct Memory Access** 🎯\n\nPointers are variables that store the memory address of another variable, offering powerful ways to manage data and memory.`,
    subQuestions: [
      'What is a Pointer?',
      'What are & and * operators?',
      'What is a NULL pointer?',
      'What is a Dangling Pointer?',
      'What is a Void Pointer (void *)?'
    ]
  },
  q_ptr_def: {
    keys: ['what is a pointer', 'pointer definition'],
    answer: `A **Pointer** is a variable that stores the memory address of another variable rather than the actual value.`
  },
  q_ptr_ops: {
    keys: ['what are & and * operators', 'dereference operator'],
    answer: `\`&\` (Address-of) returns the memory location. \`*\` (Dereference) returns the value stored at that location.`
  },
  q_null_ptr: {
    keys: ['what is a null pointer', 'null pointer'],
    answer: `A **NULL pointer** points to nothing (address 0). It is good practice to initialize pointers to NULL to avoid "garbage" values.`
  },
  q_dangling_ptr: {
    keys: ['what is a dangling pointer', 'dangling pointer'],
    answer: `A **Dangling Pointer** points to a memory location that has already been deleted or freed.`
  },
  q_void_ptr: {
    keys: ['what is a void pointer', 'void *'],
    answer: `A **Void Pointer** (\`void *\`) is a generic pointer that can point to any data type. It must be cast before it can be dereferenced.`
  },

  pointerArithmetic: {
    keys: ['pointer arithmetic', 'ptr++', 'ptr+1', 'array pointer', 'pointer difference', 'pointer comparison', 'scaling'],
    answer: `**Pointer Arithmetic: Moving in Memory** 📏\n\nYou can perform arithmetic on pointers to navigate through memory blocks (like arrays) based on the size of the data type.`,
    subQuestions: [
      'How does ptr++ work?',
      'Can I add two pointers?',
      'Can I subtract two pointers?',
      'What is scaling in pointer math?',
      'What is a Pointer to Pointer (**ptr)?'
    ]
  },
  q_ptr_inc: {
    keys: ['how does ptr++ work'],
    answer: `\`ptr++\` moves the pointer to the next element of its type. If it's an \`int*\`, it jumps 4 bytes (on most systems).`
  },
  q_ptr_add: {
    keys: ['can i add two pointers'],
    answer: `No. You cannot add two addresses together in C. It is a logic error and illegal.`
  },
  q_ptr_sub: {
    keys: ['can i subtract two pointers'],
    answer: `Yes. Subtracting two pointers of the same type gives the number of elements between them.`
  },
  q_ptr_scaling: {
    keys: ['what is scaling in pointer math', 'scaling'],
    answer: `**Scaling** means the compiler automatically adjusts the increment/decrement based on the \`sizeof\` the data type the pointer points to.`
  },
  q_ptr_to_ptr: {
    keys: ['pointer to pointer', '**ptr'],
    answer: `A **Pointer to Pointer** is a variable that stores the address of another pointer. It is used for dynamic 2D arrays or passing pointers to functions.`
  },

  malloc: {
    keys: ['malloc', 'calloc', 'realloc', 'free', 'memory', 'dynamic', 'heap', 'allocation', 'stack', 'memory leak', 'sizeof', 'brk', 'sbrk'],
    answer: `**Dynamic Memory: The Heap** 🧠\n\nDynamic memory allocation allows you to reserve memory at runtime when you don't know the size of data beforehand.`,
    subQuestions: [
      'malloc() vs calloc()?',
      'What is a Memory Leak?',
      'What does realloc() do?',
      'Stack vs Heap memory?',
      'Why check if malloc returns NULL?'
    ]
  },
  q_malloc_calloc: {
    keys: ['malloc vs calloc', 'calloc vs malloc'],
    answer: `\`malloc\` allocates a block of memory (garbage values). \`calloc\` allocates and initializes all bytes to zero.`
  },
  q_memory_leak: {
    keys: ['what is a memory leak', 'memory leak'],
    answer: `A **Memory Leak** happens when you allocate heap memory but forget to \`free()\` it, eventually running out of system memory.`
  },
  q_realloc: {
    keys: ['what does realloc() do', 'realloc'],
    answer: `\`realloc()\` resizes a previously allocated memory block while keeping the existing data intact.`
  },
  q_stack_heap: {
    keys: ['stack vs heap'],
    answer: `**Stack**: Fast, automatic management, small size. **Heap**: Slower, manual management (\`malloc\`), much larger size.`
  },
  q_malloc_null: {
    keys: ['why check if malloc returns null'],
    answer: `If the system is out of memory, \`malloc\` returns **NULL**. You must check for this to prevent your program from crashing.`
  },
  files: {
    keys: ['file', 'fopen', 'fclose', 'fprintf', 'fscanf', 'fgets', 'fputs', 'fread', 'fwrite', 'binary', 'file handling', 'read file', 'write file', 'seek', 'tell', 'rewind', 'eof'],
    answer: `**File Handling: Persistent Storage** 💾\n\nFile handling in C allows you to read from and write to secondary storage devices, making your data permanent beyond program execution.`,
    subQuestions: [
      'What are common File Modes?',
      'What is EOF (End of File)?',
      'Text vs Binary files?',
      'Why use fclose()?',
      'How to check file errors?'
    ]
  },
  q_file_modes: {
    keys: ['common file modes', 'fopen modes'],
    answer: `Common modes use with \`fopen\`:\n- \`"r"\`: Read\n- \`"w"\`: Write (overwrites)\n- \`"a"\`: Append (adds to end)`
  },
  q_eof: {
    keys: ['what is eof', 'end of file'],
    answer: `**EOF** is a constant defined in \`stdio.h\` used to indicate the end of a file stream (usually has a value of -1).`
  },
  q_file_types: {
    keys: ['text vs binary files'],
    answer: `**Text files** store data in human-readable ASCII format. **Binary files** store data in the same raw byte format used in RAM.`
  },
  q_fclose: {
    keys: ['why use fclose()'],
    answer: `\`fclose()\` releases the memory and resources associated with a file and ensures that any data in the buffers is actually written to the disk.`
  },
  q_file_check: {
    keys: ['how to check file errors', 'perror'],
    answer: `Always check if the FILE pointer is \`NULL\` after \`fopen\`. You can use \`perror()\` to print a human-readable error message.`
  },

  preprocessor: {
    keys: ['preprocessor', 'define', 'macro', 'ifdef', 'ifndef', 'pragma', 'include guard', 'header guard', 'conditional compilation', 'substitution'],
    answer: `**Preprocessors: Before Compilation** 🛠️\n\nThe preprocessor is a program that processes the source code before it is passed to the compiler, performing text substitution and conditional compilation.`,
    subQuestions: [
      'What is a Preprocessor?',
      'Macro vs Function?',
      'What are Include Guards?',
      '#include <...> vs #include "..."',
      'What is Conditional Compilation?'
    ]
  },
  q_preprocessor_def: {
    keys: ['what is a preprocessor'],
    answer: `A **Preprocessor** is a module that handles directives (like \`#include\` and \`#define\`) to modify the text of the source program before the actual compiler runs on it.`
  },
  q_macro_func: {
    keys: ['macro vs function', '#define macro'],
    answer: `**Macros** are faster (no calling overhead) but have no type checking and can lead to code bloat. **Functions** are typesafe and have their own scope.`
  },
  q_include_guards: {
    keys: ['what are include guards', '#ifndef'],
    answer: `**Include Guards** (\`#ifndef\`, \`#define\`, \`#endif\`) prevent the same header file from being included multiple times, avoiding redefinition errors.`
  },
  q_include_types: {
    keys: ['#include <...> vs #include "..."'],
    answer: `\`<...>\` searches in standard system directories. \`"..."\` searches in the current directory first, used for your own header files.`
  },
  q_cond_comp: {
    keys: ['what is conditional compilation', '#ifdef'],
    answer: `**Conditional Compilation** (\`#ifdef\`, \`#if\`) allows you to compile or skip parts of the code depending on whether a macro is defined (e.g., a DEBUG flag).`
  },

  compile: {
    keys: ['gcc', 'compile', 'compiler', 'how to run', 'build c', 'run c', 'linker', 'object file', 'compilation', 'executable', 'steps'],
    answer: `**The Compilation Journey** 🚀\n\nC is a compiled language. Your source code must pass through several stages to become a machine-runnable executable file.`,
    subQuestions: [
      'What are the 4 stages?',
      'What is a Linker?',
      'What is an Object file?',
      'How to use GCC?',
      'Linking the Math library (-lm)'
    ]
  },
  q_comp_stages: {
    keys: ['4 stages of c compilation'],
    answer: `The 4 stages are:\n1. **Preprocessing**\n2. **Compilation** (to assembly)\n3. **Assembly** (to object code)\n4. **Linking** (to executable)`
  },
  q_linker: {
    keys: ['what is a linker'],
    answer: `The **Linker** combines different object files and required library functions like \`printf\` into a single, complete executable file.`
  },
  q_obj_file: {
    keys: ['what is an object file'],
    answer: `An **Object file** (\`.o\` or \`.obj\`) contains machine code but is not yet a complete program because it doesn't have addresses for external functions.`
  },
  q_gcc_usage: {
    keys: ['how to use gcc', 'gcc command'],
    answer: `Use \`gcc main.c -o program\` to compile. The \`-o\` flag specifies the name of the resulting executable file.`
  },
  q_gcc_math: {
    keys: ['linking the math library', '-lm'],
    answer: `The math library (\`math.h\`) is not linked by default on Linux/Unix systems. You must use the \`-lm\` flag when compiling (e.g., \`gcc main.c -lm\`).`
  },

  formatSpecifiers: {
    keys: ['format specifier', '%d', '%f', '%c', '%s', '%p', '%x', '%o', 'scanf format', 'printf format', 'field width', 'precision', 'escape sequence'],
    answer: `**Format Specifiers & I/O formatting** 📑\n\nFormat specifiers act as placeholders that tell the compiler how to interpret and display different types of data.`,
    subQuestions: [
      'What is a Format Specifier?',
      'Common list of specifiers',
      'How to control decimal places?',
      'What is Field Width?',
      'What is an Escape Sequence?'
    ]
  },
  q_specifier_def: {
    keys: ['what is a format specifier'],
    answer: `A **Format Specifier** is a sequence (like \`%d\`) used in I/O functions like \`printf\` and \`scanf\` to represent data types during printing or reading.`
  },
  q_specifier_list: {
    keys: ['common list of specifiers'],
    answer: `Common ones:\n- \`%d\`: Integer\n- \`%f\`: Float\n- \`%c\`: Character\n- \`%s\`: String\n- \`%p\`: Pointer address`
  },
  q_format_precision: {
    keys: ['how to control decimal places', '%.2f'],
    answer: `Use a dot and a number between \`%\` and \`f\`. For example, \`%.2f\` will round and display exactly 2 decimal places.`
  },
  q_format_width: {
    keys: ['what is field width', '%5d'],
    answer: `**Field Width** (e.g., \`%10d\`) reserves at least that many spaces for the value, which is useful for aligning columns of data.`
  },
  q_escape_seq: {
    keys: ['what is an escape sequence', '\\n'],
    answer: `**Escape Sequences** are special characters used inside strings, such as \`\\n\` for a new line and \`\\t\` for a tab.`
  },

  storageClasses: {
    keys: ['storage class', 'auto', 'register', 'static', 'extern', 'lifetime', 'linkage'],
    answer: `**Storage Classes: Lifetime & Scope** ⏱️\n\nStorage classes define the scope (visibility) and lifetime of variables and functions within a C program.`,
    subQuestions: [
      'What are the 4 storage classes?',
      'auto vs static?',
      'What is the extern keyword?',
      'What is the register class?',
      'How to use static as a counter?'
    ]
  },
  q_storage_list: {
    keys: ['4 storage classes'],
    answer: `The 4 classes are:\n- **auto** (default for local)\n- **static** (persistent)\n- **extern** (global from another file)\n- **register** (stored in CPU register)`
  },
  q_auto_static: {
    keys: ['auto vs static'],
    answer: `**auto** variables are destroyed when the function ends. **static** variables retain their value across multiple function calls.`
  },
  q_extern: {
    keys: ['what is the extern keyword', 'extern'],
    answer: `**extern** tells the compiler that the variable is defined in another source file or outside the current scope.`
  },
  q_register: {
    keys: ['what is the register class', 'register'],
    answer: `**register** is a hint to the compiler to store the variable in a CPU register (faster access), though modern compilers often ignore this and optimize automatically.`
  },
  q_static_counter: {
    keys: ['how to use static as a counter', 'static counter'],
    answer: `Example:\n\`void count() {\n  static int c = 0;\n  printf("%d ", ++c);\n}\` (Prints 1 2 3...)`
  },

  typeCasting: {
    keys: ['type cast', 'casting', 'implicit', 'explicit', 'conversion', 'type conversion', 'promote'],
    answer: `**Type Casting: Converting Types** 🔀\n\nType casting is the process of converting a variable from one data type to another, either automatically (implicit) or manually (explicit).`,
    subQuestions: [
      'Implicit vs Explicit casting?',
      'What is type promotion?',
      'Example of narrowing cast',
      'How to cast division results?',
      'What is data truncation?'
    ]
  },
  q_implicit_explicit: {
    keys: ['implicit vs explicit casting'],
    answer: `**Implicit** casting is automatic (e.g., int to float). **Explicit** casting is done by the programmer using \`(type)value\`.`
  },
  q_promotion: {
    keys: ['what is type promotion'],
    answer: `**Type Promotion** is when the compiler automatically upgrades a "smaller" type (like \`char\`) to a "larger" type (like \`int\`) during operations.`
  },
  q_narrowing: {
    keys: ['example of narrowing cast', 'narrowing'],
    answer: `**Narrowing** cast is when you convert a larger type to a smaller one (e.g., \`float\` to \`int\`). This often results in data loss.`
  },
  q_cast_div: {
    keys: ['how to cast division results'],
    answer: `Divide two integers: \`7 / 2 = 3\`. To get \`3.5\`, cast one value to float: \`(float)7 / 2\`.`
  },
  q_truncation: {
    keys: ['what is data truncation'],
    answer: `**Truncation** is the loss of the fractional part of a number (e.g., \`3.99\` becomes \`3\`) when casting a \`float\` or \`double\` to an \`int\`.`
  },

  enum: {
    keys: ['enum', 'enumeration', 'named constants', 'enum values', 'typedef enum'],
    answer: `**Enums: Readable Constants** 🏷️\n\nAn enumeration (\`enum\`) is a user-defined data type that consists of a set of named integer constants, which simplifies code readability.`,
    subQuestions: [
      'What is an Enum?',
      'What are default enum values?',
      'Can I change enum values?',
      'enum vs #define macros?',
      'example typedef enum'
    ]
  },
  q_enum_def: {
    keys: ['what is an enum'],
    answer: `An **Enum** allows you to assign human-readable names to numbers. For example, \`enum Days { SUN, MON, TUE };\` where \`SUN\` is 0, \`MON\` is 1.`
  },
  q_enum_vals: {
    keys: ['what are default enum values'],
    answer: `By default, members start at \`0\` and increment by \`1\` for each subsequent name in the list.`
  },
  q_enum_change: {
    keys: ['can i change enum values'],
    answer: `Yes! You can assign any value: \`enum { RED=5, BLUE=10 }\`. Subsequent items follow the last assigned number.`
  },
  q_enum_macro: {
    keys: ['enum vs #define macros'],
    answer: `**Enums** are typesafe and scoped; **#define** macros are simple text replacements without any type checking.`
  },
  q_typedef_enum: {
    keys: ['example typedef enum'],
    answer: `Example:\n\`typedef enum { SUCCESS, FAILURE } status_t;\` now you can use \`status_t s1 = SUCCESS;\` instead of the \`enum\` keyword.`
  },

  commandLine: {
    keys: ['command line', 'argc', 'argv', 'main arguments', 'command line argument', 'atoi', 'atof'],
    answer: `**Command Line Arguments** 💻\n\nCommand line arguments allow you to pass external information to your C program at the moment of execution.`,
    subQuestions: [
      'What are argc and argv?',
      'What is stored in argv[0]?',
      'How to convert CLI strings to numbers?',
      'Why use CLI arguments?',
      'Max number of arguments'
    ]
  },
  q_argc_argv: {
    keys: ['what are argc and argv'],
    answer: `\`argc\` (Argument Count) is the number of arguments passed. \`argv\` (Argument Vector) is an array of strings representing the arguments.`
  },
  q_argv0: {
    keys: ['what is stored in argv[0]'],
    answer: `\`argv[0]\` traditionally contains the **name of the program** or the path used to run the executable.`
  },
  q_cli_to_num: {
    keys: ['how to convert cli strings to numbers'],
    answer: `Use \`atoi()\` (integer) or \`atof()\` (float) from \`<stdlib.h>\` to convert string arguments like "42" into numeric values.`
  },
  q_cli_usage: {
    keys: ['why use cli arguments'],
    answer: `Use them to pass settings, filenames, or numbers into your program without needing an interactive \`scanf\` session.`
  },
  q_cli_limit: {
    keys: ['max number of arguments'],
    answer: `The limit depends on the Operating System (e.g., Linux/Windows), but it is usually large enough to handle thousands of parameters.`
  },

  linkedList: {
    keys: ['linked list', 'node', 'next pointer', 'singly linked', 'doubly linked', 'insert node', 'delete node', 'head'],
    answer: `**Linked Lists: Dynamic Sequences** 🔗\n\nLinked lists are dynamic data structures where each element (node) points to the next, allowing memory to grow and shrink as needed.`,
    subQuestions: [
      'What is a Linked List?',
      'Array vs Linked List?',
      'What is a Node?',
      'What is the Head?',
      'How to detect list end?'
    ]
  },
  q_ll_def: {
    keys: ['what is a linked list'],
    answer: `A **Linked List** is a sequence of nodes where each node stores a data value and a pointer (link) to the next node in the sequence.`
  },
  q_array_list: {
    keys: ['array vs linked list', 'linked list vs array'],
    answer: `**Arrays**: Fixed size, fast random access. **Linked Lists**: Dynamic size, fast insertion/deletion, slow linear access.`
  },
  q_node: {
    keys: ['what is a node', 'linked list node'],
    answer: `A **Node** is a simple structure (struct) containing two parts: the actual **data** and a **pointer** to the next node of the same type.`
  },
  q_head: {
    keys: ['what is the head'],
    answer: `The **Head** is a pointer that stores the address of the very first node in the linked list.`
  },
  q_null_end: {
    keys: ['how to detect list end'],
    answer: `The end of a linked list is reached when the \`next\` pointer of the current node is \`NULL\`.`
  },

  sorting: {
    keys: ['sort', 'bubble sort', 'selection sort', 'insertion sort', 'merge sort', 'quick sort', 'sorting algorithm', 'qsort', 'complexity'],
    answer: `**Sorting: Organizing Data** 📊\n\nSorting is the process of arranging elements in a specific order (ascending or descending) to make searching and processing more efficient.`,
    subQuestions: [
      'What is Bubble Sort?',
      'What is Quick Sort?',
      'What is the qsort() function?',
      'What is Stable Sort?',
      'When to use Selection Sort?'
    ]
  },
  q_bubble_sort: {
    keys: ['what is bubble sort'],
    answer: `**Bubble Sort** repeatedly swaps adjacent elements if they are in the wrong order. It is easy to write but slow for large lists (\`O(n²)\`).`
  },
  q_quick_sort: {
    keys: ['what is quick sort'],
    answer: `**Quick Sort** is a fast divide-and-conquer algorithm that picks a pivot and partitions the array. Average case is \`O(n log n)\`.`
  },
  q_qsort: {
    keys: ['what is the qsort() function'],
    answer: `\`qsort()\` is a powerful built-in library function in \`<stdlib.h>\` that allows you to sort arrays of any type using a custom comparison function.`
  },
  q_stable_sort: {
    keys: ['what is stable sort'],
    answer: `A sort is **stable** if it preserves the original relative order of elements with equal values (e.g., Merge Sort).`
  },
  q_sorting_choice: {
    keys: ['when to use selection sort'],
    answer: `Use **Selection Sort** only for very small datasets or where memory swaps are expensive, as it minimizes the number of actual swaps.`
  },

  math: {
    keys: ['math.h', 'pow', 'sqrt', 'abs', 'floor', 'ceil', 'sin', 'cos', 'log', 'exp', 'hypot', 'cbrt'],
    answer: `**C Math Functions: Advanced Calculation** 📐\n\nThe \`math.h\` header file provides a comprehensive set of mathematical functions for scientific and engineering calculations.`,
    subQuestions: [
      'How to calculate power (x^y)?',
      'Square root function?',
      'Difference between floor and ceil?',
      'How to use abs() and fabs()?',
      'math.h constants (M_PI)?'
    ]
  },
  q_math_pow: {
    keys: ['how to calculate power', 'pow()'],
    answer: `Use \`pow(base, exponent)\`. Example: \`pow(2, 3)\` returns \`8.0\`. It always works with and returns \`double\` values.`
  },
  q_math_sqrt: {
    keys: ['square root function', 'sqrt()'],
    answer: `\`sqrt(x)\` calculates the square root of \`x\`. Remember to pass a positive value to avoid errors.`
  },
  q_floor_ceil: {
    keys: ['difference between floor and ceil'],
    answer: `\`floor(x)\` rounds DOWN to the nearest whole number. \`ceil(x)\` rounds UP to the nearest whole number (e.g., 3.1 becomes 4.0).`
  },
  q_math_abs: {
    keys: ['difference between abs() and fabs()'],
    answer: `Use \`abs()\` (from \`stdlib.h\`) for **integers**. Use \`fabs()\` (from \`math.h\`) for **floats**.`
  },
  q_math_pi: {
    keys: ['math.h constants', 'M_PI'],
    answer: `\`math.h\` defines useful constants like \`M_PI\` (π) and \`M_E\` (e) to make your calculations more accurate and readable.`
  },

  errorHandling: {
    keys: ['error handling', 'errno', 'perror', 'strerror', 'stderr', 'exit', 'exit(1)', 'exception', 'NULL check'],
    answer: `**Error Handling: Defensive Programming** 🛡️\n\nC does not have built-in exception handling (try-catch), so it relies on return values and error codes to handle failures.`,
    subQuestions: [
      'What is errno?',
      'perror() vs strerror()?',
      'Why check for NULL?',
      'What are Exit Status codes?',
      'How to use stderr?'
    ]
  },
  q_errno_def: {
    keys: ['what is errno'],
    answer: `**errno** is a global integer that stores an error number set by system calls and some library functions when something goes wrong.`
  },
  q_perror_str: {
    keys: ['perror vs strerror'],
    answer: `\`perror("msg")\` prints your message followed by the current error. \`strerror(errno)\` returns the error message as a string.`
  },
  q_null_check: {
    keys: ['why check for null', 'null check'],
    answer: `Always check for \`NULL\` (e.g., after \`malloc\` or \`fopen\`) to prevent your program from attempting to access invalid memory and crashing.`
  },
  q_exit_codes: {
    keys: ['what are exit status codes', 'exit(1)'],
    answer: `\`exit(0)\` means success. \`exit(1)\` (or any non-zero) tells the operating system that the program failed.`
  },
  q_stderr_usage: {
    keys: ['how to use stderr'],
    answer: `Use \`fprintf(stderr, "Error message\\n");\` to output errors to the standard error stream, which is separate from standard output (\`stdout\`).`
  },
};

const INITIAL_SUGGESTIONS = [
  'What is C?',
  'What is a Pointer?',
  'Explain recursion',
  'How does malloc() work?',
  'Explain bitwise operators',
  'Sorting algorithms in C',
  'File handling in C',
  'Format specifiers list',
];

const askAI = (question) => {
  const q = question.toLowerCase().trim();
  
  // 1. Try EXACT MATCH in keys (highest priority)
  for (const key in C_KNOWLEDGE) {
    if (C_KNOWLEDGE[key].keys.some(k => q === k.toLowerCase())) {
      return {
        answer: C_KNOWLEDGE[key].answer,
        followUps: C_KNOWLEDGE[key].subQuestions || INITIAL_SUGGESTIONS
      };
    }
  }

  // 2. Try LONGEST partial match (prevents generic 'c' from over-matching)
  let bestMatch = null;
  let maxMatchLen = 0;

  for (const key in C_KNOWLEDGE) {
    for (const k of C_KNOWLEDGE[key].keys) {
      if (q.includes(k.toLowerCase()) && k.length > maxMatchLen) {
        maxMatchLen = k.length;
        bestMatch = C_KNOWLEDGE[key];
      }
    }
  }

  if (bestMatch) {
    return {
      answer: bestMatch.answer,
      followUps: bestMatch.subQuestions || INITIAL_SUGGESTIONS
    };
  }

  // 3. Fallback for unhandled questions
  return {
    answer: `Good question about **"${question}"**! 🤔\n\nI'm your **C Language Specialist**. Try asking about Basics, Pointers, or Functions. 💡`,
    followUps: INITIAL_SUGGESTIONS
  };
};

function fmt(text) {
  // Render markdown table
  const tableRegex = /(\|.+\|\n)+/g;
  text = text.replace(tableRegex, (match) => {
    const rows = match.trim().split('\n');
    let html = '<table style="border-collapse:collapse;width:100%;margin:8px 0;font-size:10px">';
    rows.forEach((row, ri) => {
      if (/^[\|\s\-]+$/.test(row)) return; // skip separator
      const cells = row.split('|').filter(c => c.trim() !== '');
      const tag = ri === 0 ? 'th' : 'td';
      html += '<tr>' + cells.map(c =>
        `<${tag} style="border:1px solid rgba(14,165,233,0.20);padding:4px 8px;color:${ri === 0 ? '#38bdf8' : '#bae6fd'}">${c.trim()}</${tag}>`
      ).join('') + '</tr>';
    });
    html += '</table>';
    return html;
  });

  return text
    .replace(/\*\*(.*?)\*\*/g, `<strong style="color:#38bdf8">$1</strong>`)
    .replace(/```[\w]*\n?([\s\S]*?)```/g,
      `<pre style="background:#000c1d;color:#4ade80;padding:10px 12px;border-radius:8px;font-size:10px;margin:8px 0;overflow-x:auto;white-space:pre;font-family:monospace;border:1px solid rgba(14,165,233,0.18)">$1</pre>`)
    .replace(/`([^`]+)`/g,
      `<code style="background:rgba(14,165,233,0.12);color:#7dd3fc;padding:1px 5px;border-radius:4px;font-family:monospace;font-size:10px">$1</code>`)
    .replace(/\n/g, '<br/>');
}

export default function Chatbot({ isOpen, onToggle }) {
  const [msgs, setMsgs] = useState([
    { id: 0, role: 'bot', text: 'Vanakkam! 🙏 I\'m your **C Programming AI Tutor**.\n\nI know **25+ C topics** — pointers, structs, recursion, sorting, bitwise ops, file handling and more!\n\nJust type your question or pick a topic below 👇' },
  ]);
  const [input, setInput]   = useState('');
  const [busy, setBusy]     = useState(false);
  const [suggestions, setSuggestions] = useState(INITIAL_SUGGESTIONS);
  const bottomRef           = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, busy]);

  const send = (text) => {
    const q = (text || input).trim();
    if (!q || busy) return;
    setMsgs(p => [...p, { id: Date.now(), role: 'user', text: q }]);
    setInput('');
    setBusy(true);

    setTimeout(() => {
      const { answer, followUps } = askAI(q);
      setMsgs(p => [...p, { id: Date.now() + 1, role: 'bot', text: answer }]);
      setSuggestions(followUps);
      setBusy(false);
    }, 500 + Math.random() * 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          exit  ={{ opacity: 0, scale: 0.92, y: 18  }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          style={{
            position: 'fixed', bottom: 88, right: 20, zIndex: 400,
            width: 345, height: 530,
            background: 'linear-gradient(160deg,#000e24,#001a3a)',
            backdropFilter: 'blur(16px)',
            borderRadius: 22,
            border: '1px solid rgba(14,165,233,0.18)',
            boxShadow: '0 28px 80px rgba(0,0,0,0.80), 0 0 0 1px rgba(14,165,233,0.07)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '13px 16px',
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'linear-gradient(90deg, rgba(14,165,233,0.18), rgba(0,26,58,0.20))',
            borderBottom: `1px solid ${T.border}`,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg,#0ea5e9,#0369a1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(14,165,233,0.30)',
            }}>
              <Bot size={18} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#e0f2fe', fontWeight: 800, fontSize: 14 }}>C AI Tutor 🤖</div>
              <div style={{ fontSize: 10, color: T.muted, display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                Offline · 25+ C Topics
              </div>
            </div>
            <button onClick={onToggle}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.muted, padding: 4 }}>
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {msgs.map(m => (
              <motion.div key={m.id}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', gap: 8, flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                  background: m.role === 'bot'
                    ? 'rgba(14,165,233,0.20)'
                    : 'rgba(3,105,161,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {m.role === 'bot'
                    ? <Bot size={13} color="#38bdf8" />
                    : <User size={13} color="#7dd3fc" />}
                </div>
                <div
                  style={{
                    maxWidth: '80%', padding: '8px 12px', borderRadius: 14,
                    fontSize: 11, lineHeight: 1.65,
                    ...(m.role === 'user'
                      ? { background: 'linear-gradient(135deg,#0ea5e9,#0369a1)', color: '#fff', borderTopRightRadius: 4 }
                      : { background: 'rgba(14,165,233,0.06)', color: T.text,
                          border: `1px solid ${T.border}`, borderTopLeftRadius: 4 })
                  }}
                  dangerouslySetInnerHTML={{ __html: m.role === 'bot' ? fmt(m.text) : m.text }}
                />
              </motion.div>
            ))}

            {busy && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(14,165,233,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={13} color="#38bdf8" />
                </div>
                <div style={{ background: 'rgba(14,165,233,0.06)', border: `1px solid ${T.border}`,
                  borderRadius: 14, borderTopLeftRadius: 4, padding: '10px 14px',
                  display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[0,1,2].map(i => (
                    <motion.div key={i}
                      animate={{ y: [0,-5,0] }}
                      transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.12 }}
                      style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8' }} />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick chips */}
          <div style={{ padding: '6px 10px', display: 'flex', gap: 5, overflowX: 'auto',
            borderTop: `1px solid ${T.border}` }} className="no-scrollbar">
            {suggestions.map(s => (
              <button key={s} onClick={() => send(s)} style={{
                flexShrink: 0, fontSize: 9, padding: '4px 10px',
                background: 'rgba(14,165,233,0.10)', color: '#38bdf8',
                border: '1px solid rgba(14,165,233,0.20)', borderRadius: 20,
                cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'background 0.2s',
              }}>
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '10px 12px', borderTop: `1px solid ${T.border}`, display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask any C question..."
              disabled={busy}
              style={{
                flex: 1, padding: '8px 14px', borderRadius: 12, fontSize: 11, outline: 'none',
                background: 'rgba(14,165,233,0.07)',
                border: `1px solid ${T.border}`,
                color: T.text,
              }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || busy}
              style={{
                width: 36, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg,#0ea5e9,#0369a1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: (!input.trim() || busy) ? 0.4 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              <Send size={14} color="#fff" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
