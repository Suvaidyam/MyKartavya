// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt

frappe.ui.form.on("Volunteer Activity", {
    refresh: function (frm) {
        console.log(frm);
        // Hide the add row button for images child table
        frm.fields_dict['images'].grid.cannot_add_rows = true;
        frm.fields_dict['images'].grid.cannot_delete_rows = false; // Allow deletion if needed
        frm.refresh_field('images');

        // Remove existing button if any
        const wrapper = frm.get_field('images').wrapper;
        wrapper.querySelector('.upload-btn')?.remove();

        // Add custom button below the grid
        const uploadBtn = $(`
            <div class="upload-btn" style="margin-top: 5px;">
                <button class="btn btn-sm btn-default">
                    ${frappe.utils.icon('upload', 'sm')}
                    Upload Multiple Images
                </button>
            </div>
        `).appendTo(wrapper);

        uploadBtn.on('click', function () {
            // Check if the document is new and unsaved
            if (frm.is_new()) {
                frappe.throw(__('Please save the document before uploading images'));
                return;
            }

            new frappe.ui.FileUploader({
                doctype: frm.doctype,
                docname: frm.docname,
                folder: 'Home/Attachments',
                allow_multiple: 1,
                restrictions: {
                    allowed_file_types: ['image/*']
                },
                on_success: (file) => {
                    // Handle both single file and array of files
                    const files = Array.isArray(file) ? file : [file];

                    files.forEach(file => {
                        // Create a new row in the child table
                        let row = frappe.model.add_child(frm.doc, 'Activity Images', 'images');
                        // Use the correct file URL format
                        row.image = file.file_url;
                        row.file_name = file.file_name;
                        console.log('Added row:', row);
                    });

                    // Refresh and save
                    frm.refresh_field('images');
                    frm.dirty();
                    frm.save().then(() => {
                        frappe.show_alert({
                            message: __('Images uploaded and saved successfully'),
                            indicator: 'green'
                        });
                    }).catch(err => {
                        console.error('Error saving:', err);
                        frappe.throw(__('Error saving images to child table'));
                    });
                }
            });
        });

        // Function to render image previews
        const renderImagePreviews = () => {
            console.log("Rendering image previews...");
            frm.fields_dict['images'].grid.grid_rows.forEach(row => {
                if (row.doc && row.doc.image) {
                    console.log("Processing row with image:", row.doc.image);
                    const imageColumn = row.columns['image'];
                    if (imageColumn && imageColumn.field && imageColumn.field.disp_area) {
                        console.log("Rendering preview for:", row.doc.image);
                        $(imageColumn.field.disp_area).html(`
                            <div style="max-width: 100px; max-height: 60px; overflow: hidden;">
                                <img src="${row.doc.image}" 
                                     style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;"
                                     onclick="frappe.ui.form.utils.zoom_image('${row.doc.image}')"
                                />
                            </div>
                        `);

                        // Bind click event
                        $(imageColumn.field.disp_area).find('img').on('click', function (e) {
                            e.preventDefault();
                            frappe.ui.form.utils.zoom_image($(this).attr('src'));
                        });
                    }
                }
            });
        };

        // Call render function after a short delay to ensure grid is loaded
        setTimeout(renderImagePreviews, 500);

        // Handle grid refresh using the correct event
        frm.fields_dict['images'].grid.wrapper.on('grid-row-render', renderImagePreviews);
    },

    images_on_form_rendered: function (frm) {
        console.log("Form rendered, triggering preview refresh");
        setTimeout(() => {
            frm.trigger('refresh');
        }, 500);
    }
});
