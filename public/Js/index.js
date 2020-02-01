
document.getElementById('addName').value = '';
document.getElementById('addNumber').value = '';
document.getElementById('searchPhone').value = '';

const editContact = (id, name, phone) => {

    document.getElementById('editId').value = id;
    document.getElementById('editName').value = name;
    document.getElementById('editPhone').value = phone;
}

const deleteContact = (id) => {
    document.getElementById('deleteId').value = id;
}

setTimeout(function() {
    $('#messagediv').fadeOut('fast');
}, 2000);

	// $(document).ready(function () {
	// 	// Activate tooltip
	// 	$('[data-toggle="tooltip"]').tooltip();

	// 	// Select/Deselect checkboxes
	// 	var checkbox = $('table tbody input[type="checkbox"]');
	// 	$("#selectAll").click(function () {
	// 		if (this.checked) {
	// 			checkbox.each(function () {
	// 				this.checked = true;
	// 			});
	// 		} else {
	// 			checkbox.each(function () {
	// 				this.checked = false;
	// 			});
	// 		}
	// 	});
	// 	checkbox.click(function () {
	// 		if (!this.checked) {
	// 			$("#selectAll").prop("checked", false);
	// 		}
	// 	});
	// });