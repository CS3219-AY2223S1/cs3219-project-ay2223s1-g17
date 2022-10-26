export default [
  {
    title: 'Two Sum',
    difficulty: 'EASY',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    topics: ['ARRAY', 'HASH TABLE'],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          'class Solution:\n\n\tdef twoSum(self, nums: List[int], target: int) -> List[int]:\n\t\t',
      },
      {
        language: 'JAVA',
        starterCode:
          'class Solution {\n\tpublic int[] twoSum(int[] nums, int target) {\n\t\t\n\t}}',
      },
      {
        language: 'C++',
        starterCode:
          'class Solution {\npublic:\n\tvector<int> twoSum(vector<int>& nums, int target) {\n\t\t\n\t}\n};',
      },
      {
        language: 'JAVASCRIPT',
        starterCode:
          '/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n\t};',
      },
    ],
    link: 'https://leetcode.com/problems/two-sum/',
  },
  {
    title: 'Reverse Linked List',
    difficulty: 'EASY',
    description:
      'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    topics: ['LINKED LIST', 'RECURSION'],
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]',
      },
      {
        input: 'head = [1,2]',
        output: '[2,1]',
      },
      {
        input: 'head = []',
        output: '[]',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          '# Definition for singly-linked list.\n\n# class ListNode:\n\n#\tdef __init__(self, val=0, next=None):\n\n#\tself.val = val\n#\tself.next = next\n\nclass Solution:\n\n\tdef reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n\t\t',
      },
      {
        language: 'JAVA',
        starterCode:
          '/**\n * Definition for singly-linked list.\n * public class ListNode {\n * \tint val;\n * \tListNode next;\n * \tListNode() {}\n * \tListNode(int val) { this.val = val; }\n * \tListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n\tpublic ListNode reverseList(ListNode head) {\n\t\t\n\t}}',
      },
      {
        language: 'C++',
        starterCode:
          '/**\n * Definition for singly-linked list.\n * struct ListNode {\n * \tint val;\n * \tListNode *next;\n * \tListNode() : val(0), next(nullptr) {}\n * \tListNode(int x) : val(x), next(nullptr) {}\n * \tListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n\tListNode* reverseList(ListNode* head) {\n\t\t\n\t}\n};',
      },
      {
        language: 'JAVASCRIPT',
        starterCode:
          '/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * \tthis.val = (val===undefined ? 0 : val)\n * \tthis.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar reverseList = function(head) {\n\t};',
      },
    ],
    link: 'https://leetcode.com/problems/reverse-linked-list/',
  },
  {
    title: 'Merge Two Sorted Lists',
    difficulty: 'EASY',
    description:
      'You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.',
    topics: ['LINKED LIST', 'RECURSION'],
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[]',
      },
      {
        input: 'list1 = [], list2 = []',
        output: '[1,1,2,3,4,4]',
      },
      {
        input: 'list1 = [], list2 = [0]',
        output: '[0]',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          '# Definition for singly-linked list.\n\n# class ListNode:\n\n#\tdef __init__(self, val=0, next=None):\n\n#\tself.val = val\n#\tself.next = next\n\nclass Solution:\n\n\tdef mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n\t\t',
      },
      {
        language: 'JAVA',
        starterCode:
          '/**\n * Definition for singly-linked list.\n * public class ListNode {\n * \tint val;\n * \tListNode next;\n * \tListNode() {}\n * \tListNode(int val) { this.val = val; }\n * \tListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n\tpublic ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n\t\t\n\t}}',
      },
      {
        language: 'C++',
        starterCode:
          '/**\n * Definition for singly-linked list.\n * struct ListNode {\n * \tint val;\n * \tListNode *next;\n * \tListNode() : val(0), next(nullptr) {}\n * \tListNode(int x) : val(x), next(nullptr) {}\n * \tListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n\tListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n\t\t\n\t}\n};',
      },
      {
        language: 'JAVASCRIPT',
        starterCode:
          '/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * \tthis.val = (val===undefined ? 0 : val)\n * \tthis.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} list1\n * @param {ListNode} list2\n * @return {ListNode}\n */\nvar mergeTwoLists = function(list1, list2) {\n\t};',
      },
    ],
    link: 'https://leetcode.com/problems/merge-two-sorted-lists/',
  },
  {
    title: 'Valid Parentheses',
    difficulty: 'EASY',
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n\n1. Open brackets must be closed by the same type of brackets.\n\n2. Open brackets must be closed in the correct order.\n\n3. Every close bracket has a corresponding open bracket of the same type.",
    topics: ['STACK', 'STRING'],
    examples: [
      {
        input: 's = "()"',
        output: 'true',
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
      },
      {
        input: 's = "(]"',
        output: 'false',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          'class Solution:\n\n\tdef isValid(self, s: str) -> bool:\n\t\t',
      },
      {
        language: 'JAVA',
        starterCode:
          'class Solution {\n\tpublic boolean isValid(String s) {\n\t\t\n\t}}',
      },
      {
        language: 'C++',
        starterCode:
          'class Solution {\npublic:\n\tbool isValid(string s) {\n\t\t\n\t}\n};',
      },
      {
        language: 'JAVASCRIPT',
        starterCode:
          '/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n\t};',
      },
    ],
    link: 'https://leetcode.com/problems/valid-parentheses/',
  },
  {
    title: 'Climbing Stairs',
    difficulty: 'EASY',
    description:
      'You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    topics: ['DYNAMIC PROGRAMMING', 'MATH', 'MEMOIZATION'],
    examples: [
      {
        input: 'n = 2',
        output: '2',
        explanation:
          'There are two ways to climb to the top.\n\n1. 1 step + 1 step\n\n2. 2 steps',
      },
      {
        input: 'n = 3',
        output: '3',
        explanation:
          'There are three ways to climb to the top.\n\n1. 1 step + 1 step + 1 step\n\n2. 1 step + 2 steps\n\n3. 2 steps + 1 step',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          'class Solution:\n\n\tdef climbStairs(self, n: int) -> int:\n\t\t',
      },
      {
        language: 'JAVA',
        starterCode:
          'class Solution {\n\tpublic int climbStairs(int n) {\n\t\t\n\t}}',
      },
      {
        language: 'C++',
        starterCode:
          'class Solution {\npublic:\n\tint climbStairs(int n) {\n\t\t\n\t}\n};',
      },
      {
        language: 'JAVASCRIPT',
        starterCode:
          '/**\n * @param {number} n\n * @return {number}\n */\nvar climbStairs = function(n) {\n\t};',
      },
    ],
    link: 'https://leetcode.com/problems/climbing-stairs/',
  },
  {
    title: 'Sort the Matrix Diagonally',
    difficulty: 'MEDIUM',
    description:
      "A matrix diagonal is a diagonal line of cells starting from some cell in either the topmost row or leftmost column and going in the bottom-right direction until reaching the matrix's end. For example, the matrix diagonal starting from mat[2][0], where mat is a 6 x 3 matrix, includes cells mat[2][0], mat[3][1], and mat[4][2].\n\nGiven an m x n matrix mat of integers, sort each matrix diagonal in ascending order and return the resulting matrix.",
    topics: ['ARRAY', 'MATRIX', 'SORTING'],
    examples: [
      {
        input: 'mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]',
        output: '[[1,1,1,1],[1,2,2,2],[1,2,3,3]]',
      },
      {
        input:
          'mat = [[11,25,66,1,69,7],[23,55,17,45,15,52],[75,31,36,44,58,8],[22,27,33,25,68,4],[84,28,14,11,5,50]]',
        output:
          '[[5,17,4,1,52,7],[11,11,25,45,8,69],[14,23,25,44,58,15],[22,27,31,36,50,66],[84,28,75,33,55,68]]',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          'class Solution:\n\n\tdef diagonalSort(self, mat: List[List[int]]) -> List[List[int]]:\n\t\t',
      },
      {
        language: 'JAVA',
        starterCode:
          'class Solution {\n\tpublic int[][] diagonalSort(int[][] mat) {\n\t\t\n\t}}',
      },
      {
        language: 'C++',
        starterCode:
          'class Solution {\npublic:\n\tvector<vector<int>> diagonalSort(vector<vector<int>>& mat) {\n\t\t\n\t}\n};',
      },
      {
        language: 'JAVASCRIPT',
        starterCode:
          '/**\n * @param {number[][]} mat\n * @return {number[][]}\n */\nvar diagonalSort = function(mat) {\n\t};',
      },
    ],
    link: 'https://leetcode.com/problems/sort-the-matrix-diagonally/',
  },
  {
    title: 'Longest Palindromic Substring',
    difficulty: 'MEDIUM',
    description:
      'Given a string s, return the longest palindromic substring in s.\n\nA string is called a palindrome string if the reverse of that string is the same as the original string.',
    topics: ['DYNAMIC PROGRAMMING', 'STRING'],
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.',
      },
      {
        input: 's = "cbbd"',
        output: '"bb"',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          'class Solution:\n\n\tdef longestPalindrome(self, s: str) -> str:\n\t\t',
      },
      {
        language: 'JAVA',
        starterCode:
          'class Solution {\n\tpublic String longestPalindrome(String s) {\n\t\t\n\t}}',
      },
      {
        language: 'C++',
        starterCode:
          'class Solution {\npublic:\n\tstring longestPalindrome(string s) {\n\t\t\n\t}\n};',
      },
      {
        language: 'JAVASCRIPT',
        starterCode:
          '/**\n * @param {string} s\n * @return {string}\n */\nvar longestPalindrome = function(s) {\n\t};',
      },
    ],
    link: 'https://leetcode.com/problems/longest-palindromic-substring/',
  },
  {
    title: '3Sum',
    difficulty: 'MEDIUM',
    description:
      'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nNotice that the solution set must not contain duplicate triplets.',
    topics: ['ARRAY', 'SORTING', 'TWO POINTERS'],
    examples: [
      {
        input: 'nums = [-1,0,1,2,-1,-4]',
        output: '[[-1,-1,2],[-1,0,1]]',
        explanation:
          'nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.\n\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.\n\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.\n\nThe distinct triplets are [-1,0,1] and [-1,-1,2].\n\nNotice that the order of the output and the order of the triplets does not matter.',
      },
      {
        input: 'nums = [0,1,1]',
        output: '[]',
        explanation: 'The only possible triplet does not sum up to 0.',
      },
      {
        input: 'nums = [0,0,0]',
        output: '[[0,0,0]]',
        explanation: 'The only possible triplet sums up to 0.',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          'class Solution:\n\n\tdef threeSum(self, nums: List[int]) -> List[List[int]]:\n\t\t',
      },
      {
        language: 'JAVA',
        starterCode:
          'class Solution {\n\tpublic List<List<Integer>> threeSum(int[] nums) {\n\t\t\n\t}}',
      },
      {
        language: 'C++',
        starterCode:
          'class Solution {\npublic:\n\tvector<vector<int>> threeSum(vector<int>& nums) {\n\t\t\n\t}\n};',
      },
      {
        language: 'JAVASCRIPT',
        starterCode:
          '/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar threeSum = function(nums) {\n\t};',
      },
    ],
    link: 'https://leetcode.com/problems/3sum/',
  },
  {
    title: 'Longest Valid Parentheses',
    difficulty: 'HARD',
    description:
      "Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.",
    topics: ['DYNAMIC PROGRAMMING', 'STACK', 'STRING'],
    examples: [
      {
        input: 's = "(()"',
        output: '2',
        explanation: 'The longest valid parentheses substring is "()".',
      },
      {
        input: 's = ")()())"',
        output: '4',
        explanation: 'The longest valid parentheses substring is "()()".',
      },
      {
        input: 's = ""',
        output: '0',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          'class Solution:\n\n\tdef longestValidParentheses(self, s: str) -> int:\n\t\t',
      },
      {
        language: 'JAVA',
        starterCode:
          'class Solution {\n\tpublic int longestValidParentheses(String s) {\n\t\t\n\t}}',
      },
      {
        language: 'C++',
        starterCode:
          'class Solution {\npublic:\n\tint longestValidParentheses(string s) {\n\t\t\n\t}\n};',
      },
      {
        language: 'JAVASCRIPT',
        starterCode:
          '/**\n * @param {string} s\n * @return {number}\n */\nvar longestValidParentheses = function(s) {\n\t};',
      },
    ],
    link: 'https://leetcode.com/problems/longest-valid-parentheses/',
  },
  {
    title: 'Candy',
    difficulty: 'HARD',
    description:
      'There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.\n\nYou are giving candies to these children subjected to the following requirements:\n\nEach child must have at least one candy.\n\nChildren with a higher rating get more candies than their neighbors.\n\nReturn the minimum number of candies you need to have to distribute the candies to the children.',
    topics: ['ARRAY', 'GREEDY'],
    examples: [
      {
        input: 'ratings = [1,0,2]',
        output: '5',
        explanation:
          'You can allocate to the first, second and third child with 2, 1, 2 candies respectively.',
      },
      {
        input: 'ratings = [1,2,2]',
        output: '4',
        explanation:
          'You can allocate to the first, second and third child with 1, 2, 1 candies respectively.\n\nThe third child gets 1 candy because it satisfies the above two conditions.',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          'class Solution:\n\n\tdef candy(self, ratings: List[int]) -> int:\n\t\t',
      },
      {
        language: 'JAVA',
        starterCode:
          'class Solution {\n\tpublic int candy(int[] ratings) {\n\t\t\n\t}}',
      },
      {
        language: 'C++',
        starterCode:
          'class Solution {\npublic:\n\tint candy(vector<int>& ratings) {\n\t\t\n\t}\n};',
      },
      {
        language: 'JAVASCRIPT',
        starterCode:
          '/**\n * @param {number[]} ratings\n * @return {number}\n */\nvar candy = function(ratings) {\n\t};',
      },
    ],
    link: 'https://leetcode.com/problems/candy/',
  },
];
