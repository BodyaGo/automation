$(document).ready(function () {
    // Show spinner during table initialization
    $('#spinner').show();

    // Initialize DataTable with export buttons and custom sorting
    var table = $('#resultsTable').DataTable({
        dom: 'Bfrtip', // Enable buttons and pagination
        buttons: [
            {
                extend: 'excelHtml5',
                text: 'Export to Excel',
                className: 'bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700',
                title: 'Comparison Results',
                exportOptions: {
                    columns: ':visible:not(:last-child)' // Exclude action columns
                }
            },
            {
                extend: 'csvHtml5',
                text: 'Export to CSV',
                className: 'bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700',
                title: 'Comparison Results',
                exportOptions: {
                    columns: ':visible:not(:last-child)' // Exclude action columns
                }
            }
        ],
        order: [[0, 'asc']], // Default sort
        pageLength: 10, // Show 10 rows per page by default
        responsive: true, // Responsive design
        language: {
            emptyTable: "No data available for comparison",
            paginate: {
                first: "First",
                last: "Last",
                next: "Next",
                previous: "Previous"
            },
            search: "Search:",
            lengthMenu: "Show _MENU_ entries per page",
            info: "Showing _START_ to _END_ of _TOTAL_ entries"
        },
        initComplete: function () {
            $('#spinner').hide(); // Hide spinner when table is ready
        }
    });

    // Filter by Category
    $('#categoryFilter').on('change', function () {
        let selectedCategory = $(this).val();
        if (selectedCategory) {
            table.column(1).search('^' + selectedCategory + '$', true, false).draw();
        } else {
            table.column(1).search('').draw();
        }
    });

    // Global Search
    $('#globalSearch').on('keyup', function () {
        table.search(this.value).draw();
    });

    // Attach export buttons
    table.buttons().container().appendTo('#resultsTable_wrapper .col-md-6:eq(0)');
});
