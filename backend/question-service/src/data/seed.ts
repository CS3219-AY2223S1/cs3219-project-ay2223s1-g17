export default [
  {
    title: 'Two Sum',
    difficulty: 'EASY',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.<br />You may assume that each input would have exactly one solution, and you may not use the same element twice.<br />You can return the answer in any order.',
    examples: [
      {
        input: 'Input: nums = [2,7,11,15], target = 9',
        output: 'Output: [0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'Input: nums = [3,2,4], target = 6',
        output: 'Output: [1,2]',
      },
      {
        input: 'Input: nums = [3,3], target = 6',
        output: 'Output: [0,1]',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          'class Solution:<br />&emsp;def twoSum(self, nums: List[int], target: int) -> List[int]:<br />',
      },
    ],
    link: 'https://leetcode.com/problems/two-sum/',
  },
  {
    title: 'Reverse Linked List',
    difficulty: 'EASY',
    description:
      'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    examples: [
      {
        input: 'Input: head = [1,2,3,4,5]',
        output: 'Output: [5,4,3,2,1]',
      },
      {
        input: 'Input: head = [1,2]',
        output: 'Output: [2,1]',
      },
      {
        input: 'Input: head = []',
        output: 'Output: []',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          '# Definition for singly-linked list.<br /># class ListNode:<br />#&emsp;&ensp;def __init__(self, val=0, next=None):<br />#&emsp;self.val = val<br />#&emsp;&emsp;self.next = next<br />class Solution:<br />&emsp;def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:<br />',
      },
    ],
    link: 'https://leetcode.com/problems/reverse-linked-list/',
  },
  {
    title: 'Merge Two Sorted Lists',
    difficulty: 'EASY',
    description:
      'You are given the heads of two sorted linked lists list1 and list2.<br />Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.<br />Return the head of the merged linked list.',
    examples: [
      {
        input: 'Input: list1 = [1,2,4], list2 = [1,3,4]',
        output: 'Output: []',
      },
      {
        input: 'Input: list1 = [], list2 = []',
        output: 'Output: [1,1,2,3,4,4]',
      },
      {
        input: 'Input: list1 = [], list2 = [0]',
        output: 'Output: [0]',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          '# Definition for singly-linked list.<br /># class ListNode:<br />#&emsp;&nbsp;def __init__(self, val=0, next=None):<br />#&emsp;&emsp;&ensp;self.val = val<br />#&emsp;&emsp;self.next = next<br />class Solution:<br />&emsp;def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:<br />',
      },
    ],
    link: 'https://leetcode.com/problems/merge-two-sorted-lists/',
  },
  {
    title: 'Valid Parentheses',
    difficulty: 'EASY',
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.<br />An input string is valid if:<br />1. Open brackets must be closed by the same type of brackets.<br />2. Open brackets must be closed in the correct order.<br />3. Every close bracket has a corresponding open bracket of the same type.",
    examples: [
      {
        input: 'Input: s = "()"',
        output: 'Output: true',
      },
      {
        input: 'Input: s = "()[]{}"',
        output: 'Output: true',
      },
      {
        input: 'Input: s = "(]"',
        output: 'Output: false',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          'class Solution:<br />&emsp;def isValid(self, s: str) -> bool:<br />',
      },
    ],
    link: 'https://leetcode.com/problems/valid-parentheses/',
  },
  {
    title: 'Climbing Stairs',
    difficulty: 'EASY',
    description:
      'You are climbing a staircase. It takes n steps to reach the top.<br />Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      {
        input: 'Input: n = 2',
        output: 'Output: 2',
        explanation:
          'Explanation: There are two ways to climb to the top.<br />1. 1 step + 1 step<br />2. 2 steps',
      },
      {
        input: 'Input: n = 3',
        output: 'Output: 3',
        explanation:
          'Explanation: There are three ways to climb to the top.<br />1. 1 step + 1 step + 1 step<br />2. 1 step + 2 steps<br />3. 2 steps + 1 step',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          'class Solution:<br />&emsp;def climbStairs(self, n: int) -> int:<br />',
      },
    ],
    link: 'https://leetcode.com/problems/climbing-stairs/',
  },
  {
    title: 'Sort the Matrix Diagonally',
    difficulty: 'MEDIUM',
    description:
      "A matrix diagonal is a diagonal line of cells starting from some cell in either the topmost row or leftmost column and going in the bottom-right direction until reaching the matrix's end. For example, the matrix diagonal starting from mat[2][0], where mat is a 6 x 3 matrix, includes cells mat[2][0], mat[3][1], and mat[4][2].<br />Given an m x n matrix mat of integers, sort each matrix diagonal in ascending order and return the resulting matrix.",
    examples: [
      {
        input: 'Input: mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]',
        output: 'Output: [[1,1,1,1],[1,2,2,2],[1,2,3,3]]',
      },
      {
        input:
          'Input: mat = [[11,25,66,1,69,7],[23,55,17,45,15,52],[75,31,36,44,58,8],[22,27,33,25,68,4],[84,28,14,11,5,50]]',
        output:
          'Output: [[5,17,4,1,52,7],[11,11,25,45,8,69],[14,23,25,44,58,15],[22,27,31,36,50,66],[84,28,75,33,55,68]]',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          'class Solution:<br />&emsp;def diagonalSort(self, mat: List[List[int]]) -> List[List[int]]:<br />',
      },
    ],
    link: 'https://leetcode.com/problems/sort-the-matrix-diagonally/',
  },
  {
    title: 'Longest Palindromic Substring',
    difficulty: 'MEDIUM',
    description:
      'Given a string s, return the longest palindromic substring in s.<br />A string is called a palindrome string if the reverse of that string is the same as the original string.',
    examples: [
      {
        input: 'Input: s = "babad"',
        output: 'Output: "bab"',
        explanation: 'Explanation: "aba" is also a valid answer.',
      },
      {
        input: 'Input: s = "cbbd"',
        output: 'Output: "bb"',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          'class Solution:<br />&emsp;def longestPalindrome(self, s: str) -> str:<br />',
      },
    ],
    link: 'https://leetcode.com/problems/longest-palindromic-substring/',
  },
  {
    title: '3Sum',
    difficulty: 'MEDIUM',
    description:
      'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.<br />Notice that the solution set must not contain duplicate triplets.',
    examples: [
      {
        input: 'Input: nums = [-1,0,1,2,-1,-4]',
        output: 'Output: [[-1,-1,2],[-1,0,1]]',
        explanation:
          'Explanation:<br />nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.<br />nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.<br />nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.<br />The distinct triplets are [-1,0,1] and [-1,-1,2].<br />Notice that the order of the output and the order of the triplets does not matter.',
      },
      {
        input: 'Input: nums = [0,1,1]',
        output: 'Output: []',
        explanation:
          'Explanation: The only possible triplet does not sum up to 0.',
      },
      {
        input: 'Input: nums = [0,0,0]',
        output: 'Output: [[0,0,0]]',
        explanation: 'Explanation: The only possible triplet sums up to 0.',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          'class Solution:<br />&emsp;def threeSum(self, nums: List[int]) -> List[List[int]]:<br />',
      },
    ],
    link: 'https://leetcode.com/problems/3sum/',
  },
  {
    title: 'Longest Valid Parentheses',
    difficulty: 'HARD',
    description:
      "Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.",
    examples: [
      {
        input: 'Input: s = "(()"',
        output: 'Output: 2',
        explanation:
          'Explanation: The longest valid parentheses substring is "()".',
      },
      {
        input: 'Input: s = ")()())"',
        output: 'Output: 4',
        explanation:
          'Explanation: The longest valid parentheses substring is "()()".',
      },
      {
        input: 'Input: s = ""',
        output: 'Output: 0',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          'class Solution:<br />&emsp;def longestValidParentheses(self, s: str) -> int:<br />',
      },
    ],
    link: 'https://leetcode.com/problems/longest-valid-parentheses/',
  },
  {
    title: 'Candy',
    difficulty: 'HARD',
    description:
      'There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.<br />You are giving candies to these children subjected to the following requirements:<br />Each child must have at least one candy.<br />Children with a higher rating get more candies than their neighbors.<br />Return the minimum number of candies you need to have to distribute the candies to the children.',
    examples: [
      {
        input: 'Input: ratings = [1,0,2]',
        output: 'Output: 5',
        explanation:
          'Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.',
      },
      {
        input: 'Input: ratings = [1,2,2]',
        output: 'Output: 4',
        explanation:
          'Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.<br />The third child gets 1 candy because it satisfies the above two conditions.',
      },
    ],
    templates: [
      {
        language: 'PYTHON',
        starterCode:
          'class Solution:<br />&emsp;def candy(self, ratings: List[int]) -> int:<br />',
      },
    ],
    link: 'https://leetcode.com/problems/candy/',
  },
];
