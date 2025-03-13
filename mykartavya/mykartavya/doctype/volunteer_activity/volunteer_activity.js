// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt

frappe.ui.form.on("Volunteer Activity", {
    refresh: function (frm) {

        // Get the field and section
        const imagesField = frm.get_field('images');
        const wrapper = imagesField.wrapper;

        // Remove the hide-control class from the parent
        $(wrapper).removeClass('hide-control');

        // Hide only the grid part
        const gridTable = wrapper.querySelector('.form-grid');
        if (gridTable) {
            gridTable.style.display = 'none';
        }

        // Hide the grid footer
        const gridFooter = wrapper.querySelector('.grid-footer');
        if (gridFooter) {
            gridFooter.style.display = 'none';
        }

        // First remove any existing custom sections to avoid duplicates
        $(wrapper).find('.custom-images-section').remove();

        // Create and append the custom section
        const customSection = $(`
            <div class="custom-images-section" style="
                margin-top: 10px;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                padding: 15px;
                display: block !important;
            ">
                <div style="
                    display: flex;
                    justify-content: space-between;  
                    align-items: center;
                    margin-bottom: 15px;
                ">
                    <div class="upload-btn">
                        <button class="btn btn-sm btn-default">
                            ${frappe.utils.icon('upload', 'sm')}
                            Upload Multiple Images
                        </button>
                    </div>
                    <div class="bulk-action-bar">
                        <button class="btn btn-sm btn-danger bulk-delete-btn" style="display: none;">
                            ${frappe.utils.icon('delete', 'sm')}
                            Delete Selected Images
                        </button>
                    </div>
                </div>
                <div class="image-gallery" style="
                    display: grid !important;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 15px;
                    padding: 15px;
                    background: #f5f7fa;
                    border-radius: 8px;
                "></div>
            </div>
        `);

        // Append the custom section after hiding the grid
        $(wrapper).append(customSection);

        // Get references to the elements
        const uploadBtn = customSection.find('.upload-btn button');
        const actionBar = customSection.find('.bulk-action-bar');
        const imageContainer = customSection.find('.image-gallery');
        // Add upload button click handler
        uploadBtn.on('click', function () {
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
                on_success: (files) => {
                    // Ensure files is always an array
                    const uploadedFiles = Array.isArray(files) ? files : [files];

                    // Create a promise to ensure all files are processed
                    Promise.all(uploadedFiles.map(file => {
                        return new Promise((resolve) => {
                            // Add each file to child table
                            let row = frappe.model.add_child(frm.doc, 'Activity Images', 'images');
                            row.image = file.file_url;
                            row.file_name = file.file_name;
                            resolve();
                        });
                    })).then(() => {
                        frm.refresh_field('images');

                        // Save the form and handle the refresh properly
                        frm.save().then(() => {
                            // Force sync the document with server
                            frappe.model.sync_docinfo(frm.doc);

                            // Reload the document to ensure we have the latest data
                            frm.reload_doc().then(() => {
                                // Single verification and alert for all files
                                if (frm.doc.images.length !== uploadedFiles.length) {
                                    frappe.show_alert({
                                        message: __('Warning: Some images may not have been properly linked. Please check the attachments.'),
                                        indicator: 'orange'
                                    });
                                } else {
                                    frappe.show_alert({
                                        message: __(`Successfully uploaded ${uploadedFiles.length} images`),
                                        indicator: 'green'
                                    });
                                }

                                // After reload, render the images
                                renderImageCards();
                            });
                        }).catch(err => {
                            console.error('Error saving:', err);
                            frappe.throw(__('Error saving images to child table'));
                        });
                    });
                }
            });
        });

        // Function to update action bar visibility
        const updateActionBar = () => {
            const checkedBoxes = imageContainer.find('input[type="checkbox"]:checked').length;
            const deleteBtn = actionBar.find('.bulk-delete-btn');
            if (checkedBoxes > 0) {
                deleteBtn.show();
            } else {
                deleteBtn.hide();
            }
        };

        // Function to render image cards
        const renderImageCards = () => {
            imageContainer.empty();

            if (frm.doc.images && frm.doc.images.length) {
                frm.doc.images.forEach((item, index) => {
                    const card = $(`
                        <div class="image-card" style="
                            background: white;
                            border-radius: 12px;
                            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                            overflow: hidden;
                            position: relative;
                            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                            display: block !important;
                            border: 2px solid transparent;
                        ">
                            <div class="checkbox-wrapper" style="
                                position: absolute;
                                top: 12px;
                                right: 12px;
                                z-index: 10;
                                background: rgba(255, 255, 255, 0.9);
                                border-radius: 6px;
                                padding: 4px;
                                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                                opacity: 0;
                                transition: opacity 0.2s ease;
                            ">
                                <input type="checkbox" 
                                    class="image-select" 
                                    data-name="${item.name}"
                                    style="
                                        width: 18px;
                                        height: 18px;
                                        cursor: pointer;
                                        border-radius: 4px;
                                        border: 2px solid #64748b;
                                    "
                                >
                            </div>
                            <div style="
                                width: 100%;
                                height: 150px;
                                overflow: hidden;
                                position: relative;
                            ">
                                <img src="${item.image}" 
                                    style="
                                        width: 100%;
                                        height: 100%;
                                        object-fit: cover;
                                        transition: transform 0.5s;
                                    "
                                />
                                <div class="image-overlay" style="
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    right: 0;
                                    bottom: 0;
                                    background: linear-gradient(
                                        to bottom,
                                        rgba(0,0,0,0.1),
                                        rgba(0,0,0,0.3)
                                    );
                                    opacity: 0;
                                    transition: opacity 0.3s;
                                "></div>
                            </div>
                            <div style="
                                padding: 16px;
                                background: linear-gradient(to bottom, #ffffff, #fafafa);
                                border-top: 1px solid #f0f0f0;
                            ">
                                <p style="
                                    margin: 0;
                                    font-size: 14px;
                                    color: #1f2937;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    font-weight: 500;
                                    margin-bottom: 8px;
                                ">${item.file_name}</p>
                                <button class="preview-btn btn btn-default btn-xs" style="
                                    width: 100%;
                                    padding: 8px;
                                    border-radius: 6px;
                                    background: #f8fafc;
                                    border: 1px solid #e2e8f0;
                                    color: #475569;
                                    font-weight: 500;
                                    align-items: center;
                                    justify-content: center;
                                    gap: 6px;
                                    transition: all 0.2s;
                                    &:hover {
                                        background: #f1f5f9;
                                        border-color: #cbd5e1;
                                    }
                                ">
                                    ${frappe.utils.icon('eye', 'sm')}
                                    Preview
                                </button>
                            </div>
                        </div>
                    `);

                    // Enhanced hover effects
                    card.hover(
                        function () {
                            $(this).css({
                                'transform': 'translateY(-4px)',
                                'box-shadow': '0 12px 24px rgba(0,0,0,0.1)',
                                'border-color': '#e2e8f0'
                            });
                            $(this).find('.image-overlay').css('opacity', '1');
                            $(this).find('.checkbox-wrapper').css('opacity', '1');
                            $(this).find('img').css('transform', 'scale(1.05)');
                        },
                        function () {
                            $(this).css({
                                'transform': 'translateY(0)',
                                'box-shadow': '0 4px 12px rgba(0,0,0,0.05)',
                                'border-color': 'transparent'
                            });
                            $(this).find('.image-overlay').css('opacity', '0');
                            $(this).find('.checkbox-wrapper').css('opacity', '0');
                            $(this).find('img').css('transform', 'scale(1)');
                        }
                    );

                    // Add checkbox state styling
                    card.find('input[type="checkbox"]').on('change', function () {
                        if (this.checked) {
                            card.css({
                                'border-color': '#64748b',
                                'background': '#f8fafc'
                            });
                        } else {
                            card.css({
                                'border-color': 'transparent',
                                'background': 'white'
                            });
                        }
                        updateActionBar();
                    });

                    // Add preview button click handler
                    card.find('.preview-btn').on('click', function () {
                        const d = new frappe.ui.Dialog({
                            title: item.file_name,
                            size: 'large',
                            fields: [{
                                fieldtype: 'HTML',
                                fieldname: 'image_preview',
                                options: `<div style="text-align: center;">
                                    <img src="${item.image}" style="max-width: 100%; max-height: 80vh;">
                                </div>`
                            }]
                        });
                        d.show();
                    });

                    imageContainer.append(card);
                });
            } else {
                imageContainer.html(`
                    <div style="
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 40px;
                        color: #6b7280;
                        background: linear-gradient(145deg, #ffffff, #f8fafc);
                        border-radius: 16px;
                        box-shadow: 0 4px 16px rgba(0,0,0,0.06);
                        max-width: 400px;
                        margin: 0 auto;
                    ">
                        <div style="
                            background: #f1f5f9;
                            width: 60px;
                            height: 60px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto 16px;
                            box-shadow: inset 0 2px 6px rgba(0,0,0,0.06);
                        ">
                            ${frappe.utils.icon('image', 'md')}
                        </div>
                        <p style="
                            margin: 0;
                            font-size: 16px;
                            font-weight: 600;
                            color: #334155;
                            letter-spacing: -0.01em;
                        ">No images uploaded yet</p>
                        <p style="
                            margin: 6px 0 0;
                            font-size: 13px;
                            color: #64748b;
                        ">Upload images to get started</p>
                    </div>
                `);
            }
        };

        // Bulk delete handler
        actionBar.find('.bulk-delete-btn').on('click', function () {
            const selectedImages = imageContainer.find('input[type="checkbox"]:checked')
                .map(function () {
                    return $(this).data('name');
                }).get();

            if (!selectedImages.length) return;

            frappe.confirm(
                __('Delete {0} selected images?', [selectedImages.length]),
                function () {
                    // Remove selected rows from the child table
                    frm.doc.images = frm.doc.images.filter(row => !selectedImages.includes(row.name));

                    // Remove from local doctype
                    selectedImages.forEach(name => {
                        locals['Activity Images'][name] = null;
                    });

                    // Mark form as dirty and save
                    frm.dirty();
                    frm.save().then(() => {
                        // Refresh the entire form to ensure proper sync
                        frm.reload_doc();

                        // After reload, re-render the cards
                        setTimeout(() => {
                            renderImageCards();
                            updateActionBar();

                            frappe.show_alert({
                                message: __('Selected images deleted successfully'),
                                indicator: 'green'
                            });
                        }, 300);
                    }).catch(err => {
                        console.error('Error deleting:', err);
                        frappe.throw(__('Error deleting images'));
                    });
                }
            );
        });

        // Initial render
        renderImageCards();
    },

    images_on_form_rendered: function (frm) {
        setTimeout(() => {
            frm.trigger('refresh');
        }, 500);
    }
});


 