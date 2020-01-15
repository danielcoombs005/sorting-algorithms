/*All descriptions from geeksforgeeks, information researched online*/
/*unicode is found at https://en.wikipedia.org/wiki/Unicode_subscripts_and_superscripts*/
const Algorithms = {
    "algorithms": [
        {
            "name": "Bubble Sort",
            "description": "Sorts by repeatedly swapping adjacent elements if they are in the wrong order.",
            "average_complexity": "n\u00B2",
            "best_complexity": "n",
            "worst_complexity": "n\u00B2",
            "space_complexity": "1",
            "advantages": [
                "simple to write and read",
                "small amount of code",
                "does not take much working memory",
                "stable"
            ],
            "disadvantages": [
                "one of the slowest sorting algorithms"
            ],
            "use": [
                "If the array has less than a few hundred items.",
                "If the array is almost sorted."
            ]
        },
        {
            "name": "Cocktail Sort",
            "description": "Sorts like Bubble Sort by repeatedly swapping adjacent elements if they are in the wrong order. As Bubble Sort only traverses in the right direction, Cocktail Sort traverses in both right and left directions.",
            "average_complexity": "n\u00B2",
            "best_complexity": "n",
            "worst_complexity": "n\u00B2",
            "space_complexity": "1",
            "advantages": [
                "faster than Bubble Sort",
                "simple to write and read",
                "stable"
            ],
            "disadvantages": [
                "one of the slowest sorting algorithms"
            ],
            "use": [
                "If the array has less than a few hundred items.",
                "If the array is almost sorted."
            ]
        },
        {
            "name": "Heapsort",
            "description": "Sorts by treating the array as a (perfect) binary tree and finding the largest value. Once found, the largest value is swapped with the last current index, and the process is continuously repeated with the next value going in the previous index.",
            "average_complexity": "nlog(n)",
            "best_complexity": "nlog(n)",
            "worst_complexity": "nlog(n)",
            "space_complexity": "1",
            "advantages": [
                "time complexity is guaranteed to be nlog(n)"
            ],
            "disadvantages": [
                "more comparisons are made than what is optimal",
                "more complex code/logic",
                "unstable"
            ],
            "use": [
                "If Mergesort is not able to be used due to space availability."
            ]
        },
        {
            "name": "Insertion Sort",
            "description": "Sorts by, in ascending order, checking and swapping with any previous index value until it is larger than the prior value.",
            "average_complexity": "n\u00B2",
            "best_complexity": "n",
            "worst_complexity": "n\u00B2",
            "space_complexity": "1",
            "advantages": [
                "simple to write and read",
                "can be implemented in other sorting algorithms",
                "stable"
            ],
            "disadvantages": [
                "one of the slowest sorting algorithms"
            ],
            "use": [
                "If the array has a small size.",
                "If the array is almost sorted."
            ]
        },
        {
            "name": "Selection Sort",
            "description": "Sorts by, in ascending order, searching for the minimum value and swapping with the current pivot value.",
            "average_complexity": "n\u00B2",
            "best_complexity": "n\u00B2",
            "worst_complexity": "n\u00B2",
            "space_complexity": "1",
            "advantages": [
                "sorting of elements does not depend on their initial arrangement"
            ],
            "disadvantages": [
                "best complexity is still slow",
                "unstable"
            ],
            "use": [
                "If the array has a small size.",
                "If the array is randomly shuffled.",
                "If you are starting to learn about sorting."
            ]
        },
        {
            "name": "Shell Sort",
            "description": "Sorts by comparing and swapping elements far apart from each other in a consecutive order and reduces the interval between elements to be sorted. For each iteration, reduces the gap by half until the list is sorted. Works similarly to Insertion Sort.",
            "average_complexity": "",
            "best_complexity": "nlog(n)",
            "worst_complexity": "n\u00B2",
            "space_complexity": "1",
            "advantages": [
                "faster than Bubble Sort and Insertion Sort"
            ],
            "disadvantages": [
                "unstable",
                "more complex in logic"
            ],
            "use": [
                "If the array has a medium size."
            ],
            "sideNote": "The worst time complexity can vary depending on the gap sequence used for comparison. At most, the worst time complexity will be O(n\u00B2), but it can be as fast as O(n\u00B3\u2E0D\u00B2) or O(nlog\u00B2(n))"
        }
    ]
}

export default Algorithms;