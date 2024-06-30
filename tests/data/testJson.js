const testCases = [
    {
        name: 'cpp : hello world',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'int main(){\n' +
                '    cout << "hello world";\n' +
                'return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'hello world',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : print stdin',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n\n' +
                'using namespace std;\n' +
                'int main(){\n\n' +
                '    int a;\n' +
                '    while(cin >> a){\n' +
                '        cout << a << endl;\n' +
                '    }\n' +
                '    return 0;\n\n' +
                '}\n',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },

    },
    {
        name: 'nodejs : hello world',
        reqObject: {
            language: 'nodejs',
            script: 'console.log(\'hello world\')',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'nodejs : print stdin',
        reqObject: {
            language: 'nodejs',
            script:
                'process.stdin.setEncoding(\'utf8\'); \n ' +
                'process.stdin.on(\'data\', (input) => { \n ' +
                '  console.log(input); \n ' +
                ' \n ' +
                '}); \n ',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1 2 3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : hello world',
        reqObject: {
            language: 'python',
            script: 'print(\'hello world\')',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : print stdin',
        reqObject: {
            language: 'python',
            script:
                'try:\n' +
                '    while(True):\n' +
                '        line = input()\n' +
                '        if not line:\n' +
                '            break\n' +
                '        print(line)\n' +
                'except EOFError:\n' +
                '    pass',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1 2 3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'c : hello world',
        reqObject: {
            language: 'c',
            script:
                '#include<stdio.h>\n\n' +
                'int main(){\n\n' +
                '    printf("hello world");\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'hello world',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'c : print stdin',
        reqObject: {
            language: 'c',
            script:
                '#include <stdio.h>\n' +
                'int main() {\n' +
                '    int number;\n' +
                '    while (scanf("%d", &number) == 1) {\n' +
                '        printf("%d\\n", number);\n' +
                '    } \n' +
                '    return 0;\n' +
                '}',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : print stdin',
        reqObject: {
            language: 'java',
            script:
                'import java.util.Scanner;\n' +
                'public class Solution {\n' +
                '    public static void main(String[] args) {\n' +
                '        System.out.println("hello world");\n' +
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : print stdin',
        reqObject: {
            language: 'java',
            script:
                'import java.util.Scanner;\n' +
                'public class Solution {\n' +
                '    public static void main(String[] args) {\n' +
                '        Scanner scanner = new Scanner(System.in);\n' +
                '        while (scanner.hasNextInt()) {\n' +
                '            int number = scanner.nextInt();\n' +
                '            System.out.println(number);\n' +
                '        } \n' +
                '        scanner.close();\n' +
                '    }\n' +
                '}\n',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : print hello world',
        reqObject: {
            language: 'ruby',
            script:
                'print "hello world"'
        },
        expectedResponse: {
            val: 'hello world',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : print stdin',
        reqObject: {
            language: 'ruby',
            script:
                'user_input = gets.chomp\n' +
                'puts user_input',
            stdin: '10\n'
        },
        expectedResponse: {
            val: '10\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'TLE test',
        reqObject: {
            language: 'nodejs',
            script: 'for(let i=0 ; ; ){i++}',
        },
        expectedResponse: {
            val: 'Time limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'MLE test',
        reqObject: {
            language: 'python',
            script: 'one_gb_data = bytearray(1000 * 1024 * 1024)',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'MLE test 2',
        reqObject: {
            language: 'python',
            script:
                'import time\n' +
                'def consume_memory(target_mb, duration_sec):\n' +
                '    float_size = 8\n' +
                '    floats_per_mb = (1024 * 1024) // float_size\n' +
                '    total_floats = target_mb * floats_per_mb\n' +
                '    iterations = int(duration_sec / 0.1)\n' +
                '    floats_per_iteration = total_floats // iterations\n' +
                '    memory_hog = []\n' +
                '    for _ in range(iterations):\n' +
                '        memory_hog.extend([0.0] * floats_per_iteration)\n' +
                '        time.sleep(0.1)\n' +
                'consume_memory(1000, 1)\n',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'MLE test 3',
        reqObject: {
            language: 'python',
            script:
                'a = [100]\n' +
                'for i in a:\n' +
                '    a.append(i)\n',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'OPEN AI test promptv1',
        reqObject: {
            language: 'promptv1',
            prompt: 'The question is what is 2 plus 2. The answer given is 4.',
        },
        expectedResponse: {
            val: {},
            status: 200,
            error: 0,
        },
    },
    {
        name: 'OPEN AI test promptv2',
        reqObject: {
            language: 'promptv2',
            prompt: 'The question is what is 2 plus 2. The answer given is 4.',
        },
        expectedResponse: {
            val: {},
            status: 200,
            error: 0,
        },
    },
    //new test cases (10 new added)
    {
        name: 'c : sum of two numbers',
        reqObject: {
            language: 'c',
            script:
                '#include<stdio.h>\n\n' +
                'int main(){\n\n' +
                '    int a, b;\n' +
                '    scanf("%d %d", &a, &b);\n' +
                '    printf("%d\\n", a + b);\n' +
                '    return 0;\n' +
                '}\n',
            stdin: '5 10',
        },
        expectedResponse: {
            val: '15\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : calculate factorial',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n\n' +
                'using namespace std;\n\n' +
                'int factorial(int n) {\n' +
                '    if (n == 0)\n' +
                '        return 1;\n' +
                '    else\n' +
                '        return n * factorial(n - 1);\n' +
                '}\n\n' +
                'int main() {\n' +
                '    int n;\n' +
                '    cin >> n;\n' +
                '    cout << factorial(n);\n' +
                '    return 0;\n' +
                '}\n',
            stdin: '5',
        },
        expectedResponse: {
            val: '120',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : reverse a string',
        reqObject: {
            language: 'java',
            script:
                'import java.util.Scanner;\n\n' +
                'public class Solution {\n\n' +
                '    public static void main(String[] args) {\n\n' +
                '        Scanner scanner = new Scanner(System.in);\n' +
                '        String input = scanner.nextLine();\n' +
                '        String reversed = new StringBuilder(input).reverse().toString();\n' +
                '        System.out.println(reversed);\n\n' +
                '        scanner.close();\n' +
                '    }\n' +
                '}\n',
            stdin: 'hello world',
        },
        expectedResponse: {
            val: 'dlrow olleh\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'nodejs : find maximum in array',
        reqObject: {
            language: 'nodejs',
            script:
                'function findMax(arr) {\n' +
                '    return Math.max(...arr);\n' +
                '}\n' +
                'const array = [1, 5, 3, 8, 2];\n' +
                'console.log(findMax(array));\n',
        },
        expectedResponse: {
            val: '8\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : count words in string',
        reqObject: {
            language: 'python',
            script:
                'sentence = "Hello world, this is a sentence."\n' +
                'words = len(sentence.split())\n' +
                'print(words)\n',
        },
        expectedResponse: {
            val: '6\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'sqlite3 : select data from table',
        reqObject: {
            language: 'sqlite3',
            script: 'CREATE TABLE employees (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER);\n' +
                    'INSERT INTO employees (name, age) VALUES ("Alice", 30);\n' +
                    'INSERT INTO employees (name, age) VALUES ("Bob", 25);\n' +
                    'SELECT * FROM employees;',
        },
        expectedResponse: {
            val: '1|Alice|30\n2|Bob|25\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'c : check prime number',
        reqObject: {
            language: 'c',
            script:
                '#include<stdio.h>\n\n' +
                'int isPrime(int n) {\n' +
                '    if (n <= 1) return 0;\n' +
                '    for (int i = 2; i * i <= n; i++) {\n' +
                '        if (n % i == 0) return 0;\n' +
                '    }\n' +
                '    return 1;\n' +
                '}\n\n' +
                'int main() {\n' +
                '    int number;\n' +
                '    scanf("%d", &number);\n' +
                '    if (isPrime(number)) {\n' +
                '        printf("%d is prime\\n", number);\n' +
                '    } else {\n' +
                '        printf("%d is not prime\\n", number);\n' +
                '    }\n' +
                '    return 0;\n' +
                '}\n',
            stdin: '7',
        },
        expectedResponse: {
            val: '7 is prime\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : sum of array elements',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n\n' +
                'using namespace std;\n\n' +
                'int main() {\n' +
                '    int n, sum = 0;\n' +
                '    cin >> n;\n' +
                '    vector<int> arr(n);\n' +
                '    for (int i = 0; i < n; ++i) {\n' +
                '        cin >> arr[i];\n' +
                '        sum += arr[i];\n' +
                '    }\n' +
                '    cout << sum;\n' +
                '    return 0;\n' +
                '}\n',
            stdin: '5\n1 2 3 4 5',
        },
        expectedResponse: {
            val: '15',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : calculate area of circle',
        reqObject: {
            language: 'java',
            script:
                'import java.util.Scanner;\n\n' +
                'public class Solution {\n\n' +
                '    public static void main(String[] args) {\n\n' +
                '        Scanner scanner = new Scanner(System.in);\n' +
                '        double radius = scanner.nextDouble();\n' +
                '        double area = Math.PI * radius * radius;\n' +
                '        System.out.println(area);\n\n' +
                '        scanner.close();\n' +
                '    }\n' +
                '}\n',
            stdin: '5.0',
        },
        expectedResponse: {
            val: '78.53981633974483\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'nodejs : factorial using recursion',
        reqObject: {
            language: 'nodejs',
            script:
                'function factorial(n) {\n' +
                '    if (n === 0) {\n' +
                '        return 1;\n' +
                '    }\n' +
                '    return n * factorial(n - 1);\n' +
                '}\n' +
                'console.log(factorial(5));\n',
        },
        expectedResponse: {
            val: '120\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : find sum of array elements',
        reqObject: {
            language: 'python',
            script:
                'array = [1, 2, 3, 4, 5]\n' +
                'print(sum(array))\n',
        },
        expectedResponse: {
            val: '15\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'sqlite3 : update data in table',
        reqObject: {
            language: 'sqlite3',
            script: 'CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER);\n' +
                    'INSERT INTO users (name, age) VALUES ("Alice", 30);\n' +
                    'INSERT INTO users (name, age) VALUES ("Bob", 25);\n' +
                    'UPDATE users SET age = 32 WHERE name = "Alice";\n' +
                    'SELECT * FROM users;',
        },
        expectedResponse: {
            val: '1|Alice|32\n2|Bob|25\n',
            status: 200,
            error: 0,
        },
    },
]

module.exports = { testCases }
