/* https://github.com/dsvllc/summernote-image-attributes */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    var readFileAsDataURL = function (file) {
        return $.Deferred(function (deferred) {
            $.extend(new FileReader(), {
                onload: function (e) {
                    var sDataURL = e.target.result;
                    deferred.resolve(sDataURL);
                },
                onerror: function () {
                    deferred.reject(this);
                }
            }).readAsDataURL(file);
        }).promise();
    };
    $.extend(true, $.summernote.lang, {
        'en-US': {
            /* US English(Default Language) */
            imageAttributes: {
                dialogTitle: 'Image Attributes',
                tooltip: 'Image Attributes',
                tabImage: 'Image',
                src: 'Source',
                browse: 'Browse',
                title: 'Title',
                alt: 'Alt Text',
                dimensions: 'Dimensions',
                tabAttributes: 'Attributes',
                class: 'Class',
                style: 'Style',
                role: 'Role',
                tabLink: 'Link',
                linkHref: 'URL',
                linkTarget: 'Target',
                linkTargetInfo: 'Options: _self, _blank, _top, _parent',
                linkClass: 'Class',
                linkStyle: 'Style',
                linkRel: 'Rel',
                linkRelInfo: 'Options: alternate, author, bookmark, help, license, next, nofollow, noreferrer, prefetch, prev, search, tag',
                linkRole: 'Role',
                tabUpload: 'Upload',
                upload: 'Upload',
                tabBrowse: 'Browse',
                editBtn: 'OK'
            }
        }
    });
    $.extend(true, $.summernote.options, {
        imageAttributesIcon: '<i class="note-icon-pencil"/>',
        imageAttributesRemoveEmpty: true,
        imageAttributesDisableImage: false,
        imageAttributesDisableImageSource: true,
        imageAttributesDisableImageTitle: false,
        imageAttributesDisableImageAltText: false,
        imageAttributesDisableImageDimensions: true,
        imageAttributesDisableAttributes: true,
        imageAttributesDisableAttributesClass: false,
        imageAttributesDisableAttributesStyle: false,
        imageAttributesDisableAttributesRole: false,
        imageAttributesDisableLink: false,
        imageAttributesDisableLinkUrl: false,
        imageAttributesDisableLinkTarget: false,
        imageAttributesDisableLinkClass: true,
        imageAttributesDisableLinkStyle: true,
        imageAttributesDisableLinkRel: true,
        imageAttributesDisableLinkRole: true,
        imageAttributesDisableUpload: true,
        imageAttributesImageFolder: ''
    });
    $.extend($.summernote.plugins, {
        'imageAttributes': function (context) {
            var self = this,
                ui = $.summernote.ui,
                $note = context.layoutInfo.note,
                $editor = context.layoutInfo.editor,
                $editable = context.layoutInfo.editable,
                options = context.options,
                lang = options.langInfo,
                imageAttributesLimitation = '';
            if (options.maximumImageFileSize) {
                var unit = Math.floor(Math.log(options.maximumImageFileSize) / Math.log(1024));
                var readableSize = (options.maximumImageFileSize / Math.pow(1024, unit)).toFixed(2) * 1 + ' ' + ' KMGTP'[unit] + 'B';
                imageAttributesLimitation = '<small class="help-block note-help-block">' + lang.image.maximumFileSize + ' : ' + readableSize + '</small>';
            }
            context.memo('button.imageAttributes', function () {
                var button = ui.button({
                    contents: options.imageAttributesIcon,
                    container: options.container,
                    tooltip: lang.imageAttributes.tooltip,
                    click: function () {
                        context.invoke('imageAttributes.show');
                    }
                });
                return button.render();
            });
            this.initialize = function () {
                var firstTab = true;
                var firstTabPane = true;
                var $container = options.dialogsInBody ? $(document.body) : $editor;
                var timestamp = Date.now();
                var body = '<ul class="nav note-nav nav-tabs note-nav-tabs mb-3">';
                if (!options.imageAttributesDisableImage) {
                    body += '  <li class="nav-item"><a class="nav-link' + (firstTab ? ' active' : '') + '" href="#note-imageAttributes' + timestamp + '" data-toggle="tab">' + lang.imageAttributes.tabImage + '</a></li>';
                    firstTab = false;
                }
                if (!options.imageAttributesDisableAttributes) {
                    body += '  <li class="nav-item"><a class="nav-link' + (firstTab ? ' active' : '') + '" href="#note-imageAttributes-attributes' + timestamp + '" data-toggle="tab">' + lang.imageAttributes.tabAttributes + '</a></li>';
                    firstTab = false;
                }
                if (!options.imageAttributesDisableLink) {
                    body += '  <li class="nav-item"><a class="nav-link' + (firstTab ? ' active' : '') + '" href="#note-imageAttributes-link' + timestamp + '" data-toggle="tab">' + lang.imageAttributes.tabLink + '</a></li>';
                    firstTab = false;
                }
                if (!options.imageAttributesDisableUpload) {
                    body += '  <li class="nav-item"><a class="nav-link' + (firstTab ? ' active' : '') + '" href="#note-imageAttributes-upload' + timestamp + '" data-toggle="tab">' + lang.imageAttributes.tabUpload + '</a></li>';
                }
                body += '</ul>' +
                    '<div class="tab-content note-tab-content">';
                // Tab 1
                if (!options.imageAttributesDisableImage) {
                    body += '  <div class="tab-pane fade note-tab-pane' + (firstTabPane ? ' show active' : '') + '" id="note-imageAttributes' + timestamp + '">';
                    if (!options.imageAttributesDisableImageSource) {
                        body += '    <div class="note-form-group form-group note-group-imageAttributes-url">' +
                            '      <label class="control-label note-form-label col-sm-3">' + lang.imageAttributes.src + '</label>' +
                            '      <div class="input-group note-input-group col-sm-9">' +
                            '        <input class="note-imageAttributes-src form-control note-form-control note-input" type="text" />' +
                            '      </div>' +
                            '    </div>';
                    } else {
                        body += '        <input class="note-imageAttributes-src" type="hidden" />';
                    }
                    if (!options.imageAttributesDisableImageTitle) {
                        body += '    <div class="note-form-group form-group note-group-imageAttributes-title">' +
                            '      <label class="control-label note-form-label col-sm-3">' + lang.imageAttributes.title + '</label>' +
                            '      <div class="input-group note-input-group col-sm-9">' +
                            '        <input class="note-imageAttributes-title form-control note-form-control note-input" type="text" />' +
                            '      </div>' +
                            '    </div>';
                    } else {
                        body += '        <input class="note-imageAttributes-title" type="hidden" />';
                    }
                    if (!options.imageAttributesDisableImageAltText) {
                        body += '    <div class="note-form-group form-group note-group-imageAttributes-alt">' +
                            '      <label class="control-label note-form-label col-sm-3">' + lang.imageAttributes.alt + '</label>' +
                            '      <div class="input-group note-input-group col-sm-9">' +
                            '        <input class="note-imageAttributes-alt form-control note-form-control note-input" type="text" />' +
                            '      </div>' +
                            '    </div>';
                    } else {
                        body += '        <input class="note-imageAttributes-alt" type="hidden" />';
                    }
                    if (!options.imageAttributesDisableImageDimensions) {
                        body += '    <div class="note-form-group form-group note-group-imageAttributes-dimensions">' +
                            '      <label class="control-label note-form-label col-sm-3">' + lang.imageAttributes.dimensions + '</label>' +
                            '      <div class="input-group note-input-group col-sm-9">' +
                            '        <input class="note-imageAttributes-width form-control note-form-control note-input" type="text" />' +
                            '        <span class="input-group-addon note-input-group-addon"> x </span>' +
                            '        <input class="note-imageAttributes-height form-control note-form-control note-input" type="text" />' +
                            '      </div>' +
                            '    </div>';
                    } else {
                        body += '        <input class="note-imageAttributes-width" type="hidden" />' +
                            '        <input class="note-imageAttributes-height" type="hidden" />';
                    }
                    body += '  </div>';
                    firstTabPane = false;
                } else {
                    body += '        <input class="note-imageAttributes-src" type="hidden" />' +
                        '        <input class="note-imageAttributes-title" type="hidden" />' +
                        '        <input class="note-imageAttributes-alt" type="hidden" />' +
                        '        <input class="note-imageAttributes-width" type="hidden" />' +
                        '        <input class="note-imageAttributes-height" type="hidden" />';
                }
                // Tab 2
                if (!options.imageAttributesDisableAttributes) {
                    body += '  <div class="tab-pane fade note-tab-pane' + (firstTabPane ? ' show active' : '') + '" id="note-imageAttributes-attributes' + timestamp + '">';
                    if (!options.imageAttributesDisableAttributesClass) {
                        body += '    <div class="note-form-group form-group note-group-imageAttributes-class">' +
                            '      <label class="control-label note-form-label col-sm-3">' + lang.imageAttributes.class + '</label>' +
                            '      <div class="input-group note-input-group col-sm-9">' +
                            '        <input class="note-imageAttributes-class form-control note-form-control note-input" type="text">' +
                            '      </div>' +
                            '    </div>';
                    } else {
                        body += '        <input class="note-imageAttributes-class" type="hidden">';
                    }
                    if (!options.imageAttributesDisableAttributesStyle) {
                        body += '    <div class="note-form-group form-group note-group-imageAttributes-style">' +
                            '      <label class="control-label note-form-label col-sm-3">' + lang.imageAttributes.style + '</label>' +
                            '      <div class="input-group note-input-group col-sm-9">' +
                            '        <input class="note-imageAttributes-style form-control note-form-control note-input" type="text">' +
                            '      </div>' +
                            '    </div>';
                    } else {
                        body += '        <input class="note-imageAttributes-style" type="hidden">';
                    }
                    if (!options.imageAttributesDisableAttributesRole) {
                        body += '    <div class="note-form-group form-group note-group-imageAttributes-role">' +
                            '      <label class="control-label note-form-label col-sm-3">' + lang.imageAttributes.role + '</label>' +
                            '      <div class="input-group note-input-group col-sm-9">' +
                            '        <input class="note-imageAttributes-role form-control note-form-control note-input" type="text">' +
                            '      </div>' +
                            '    </div>';
                    } else {
                        body += '        <input class="note-imageAttributes-role" type="hidden">';
                    }
                    body += '  </div>';
                    firstTabPane = false;
                } else {
                    body += '        <input class="note-imageAttributes-class" type="hidden">' +
                        '        <input class="note-imageAttributes-style" type="hidden">' +
                        '        <input class="note-imageAttributes-role" type="hidden">';
                }
                // Tab 3
                if (!options.imageAttributesDisableLink) {
                    body += '  <div class="tab-pane fade note-tab-pane' + (firstTabPane ? ' show active' : '') + '" id="note-imageAttributes-link' + timestamp + '">';
                    if (!options.imageAttributesDisableLinkUrl) {
                        body += '    <div class="note-form-group form-group note-group-imageAttributes-link-href">' +
                        '      <label class="control-label note-form-label col-sm-3">' + lang.imageAttributes.linkHref + '</label>' +
                        '      <div class="input-group note-input-group col-sm-9">' +
                        '        <input class="note-imageAttributes-link-href form-control note-form-control note-input" type="text">' +
                        '      </div>' +
                        '    </div>';
                    } else {
                        body += '        <input class="note-imageAttributes-link-href" type="hidden">';
                    }
                    if (!options.imageAttributesDisableLinkTarget) {
                        body += '    <div class="note-form-group form-group note-group-imageAttributes-link-target">' +
                        '      <label class="control-label note-form-label col-sm-3">' + lang.imageAttributes.linkTarget + '</label>' +
                        '      <div class="input-group note-input-group col-sm-9">' +
                        '        <select class="note-imageAttributes-link-target form-control note-form-control">' +
                        '          <option></option>' +
                        '          <option>_blank</option>' +
                        '          <option>_parent</option>' +
                        '          <option>_self</option>' +
                        '          <option>_top</option>' +
                        '        </select>' +
                        // '        <input class="note-imageAttributes-link-target form-control note-form-control note-input" type="text">' +
                        '      </div>' +
                        // '      <small class="help-block note-help-block text-right">' + lang.imageAttributes.linkTargetInfo + '</small>' +
                        '    </div>';
                    } else {
                        body += '        <input class="note-imageAttributes-link-target" type="hidden">';
                    }
                    if (!options.imageAttributesDisableLinkClass) {
                        body += '    <div class="note-form-group form-group note-group-imageAttributes-link-class">' +
                        '      <label class="control-label note-form-label col-sm-3">' + lang.imageAttributes.linkClass + '</label>' +
                        '      <div class="input-group note-input-group col-sm-9">' +
                        '        <input class="note-imageAttributes-link-class form-control note-form-control note-input" type="text">' +
                        '      </div>' +
                        '    </div>';
                    } else {
                        body += '        <input class="note-imageAttributes-link-class" type="hidden">';
                    }
                    if (!options.imageAttributesDisableLinkStyle) {
                        body += '    <div class="note-form-group form-group note-group-imageAttributes-link-style">' +
                        '      <label class="control-label note-form-label col-sm-3">' + lang.imageAttributes.linkStyle + '</label>' +
                        '      <div class="input-group note-input-group col-sm-9">' +
                        '        <input class="note-imageAttributes-link-style form-control note-form-control note-input" type="text">' +
                        '      </div>' +
                        '    </div>';
                    } else {
                        body += '        <input class="note-imageAttributes-link-style" type="hidden">';
                    }
                    if (!options.imageAttributesDisableLinkRel) {
                        body += '    <div class="note-form-group form-group note-group-imageAttributes-link-rel">' +
                        '      <label class="control-label note-form-label col-sm-3">' + lang.imageAttributes.linkRel + '</label>' +
                        '      <div class="input-group note-input-group col-sm-9">' +
                        '        <input class="note-imageAttributes-link-rel form-control note-form-control note-input" type="text">' +
                        '      </div>' +
                        '      <small class="help-block note-help-block text-right">' + lang.imageAttributes.linkRelInfo + '</small>' +
                        '    </div>';
                    } else {
                        body += '        <input class="note-imageAttributes-link-rel" type="hidden">';
                    }
                    if (!options.imageAttributesDisableLinkRole) {
                        body += '    <div class="note-form-group form-group note-group-imageAttributes-link-role">' +
                        '      <label class="control-label note-form-label col-sm-3">' + lang.imageAttributes.linkRole + '</label>' +
                        '      <div class="input-group note-input-group col-sm-9">' +
                        '        <input class="note-imageAttributes-link-role form-control note-form-control note-input" type="text">' +
                        '      </div>' +
                        '    </div>';
                    } else {
                        body += '        <input class="note-imageAttributes-link-role" type="hidden">';
                    }
                    body += '  </div>';
                    firstTabPane = false;
                } else {
                    body += '        <input class="note-imageAttributes-link-href" type="hidden">' +
                        '        <input class="note-imageAttributes-link-target" type="hidden">' +
                        '        <input class="note-imageAttributes-link-class" type="hidden">' +
                        '        <input class="note-imageAttributes-link-style" type="hidden">' +
                        '        <input class="note-imageAttributes-link-rel" type="hidden">' +
                        '        <input class="note-imageAttributes-link-role" type="hidden">';
                }
                // Tab 4
                if (!options.imageAttributesDisableUpload) {
                    body += '  <div class="tab-pane fade note-tab-pane' + (firstTabPane ? ' show active' : '') + '" id="note-imageAttributes-upload' + timestamp + '">' +
                        '   <label class="control-label note-form-label col-sm-3">' + lang.imageAttributes.upload + '</label>' +
                        '   <div class="input-group note-input-group col-sm-9">' +
                        '     <input class="note-imageAttributes-input form-control note-form-control note-input" type="file" name="files" accept="image/*" multiple="multiple" />' +
                        imageAttributesLimitation +
                        '    </div>' +
                        '  </div>';
                }
                // Tab 1
                body += '</div>';
                this.$dialog = ui.dialog({
                    title: lang.imageAttributes.dialogTitle,
                    body: body,
                    footer: '<button href="#" class="btn btn-primary note-btn note-btn-primary note-imageAttributes-btn">' + lang.imageAttributes.editBtn + '</button>'
                }).render().appendTo($container);
            };
            this.destroy = function () {
                ui.hideDialog(this.$dialog);
                this.$dialog.remove();
            };
            this.bindEnterKey = function ($input, $btn) {
                $input.on('keypress', function (e) {
                    if (e.keyCode === 13) $btn.trigger('click');
                });
            };
            this.bindLabels = function () {
                self.$dialog.find('.form-control:first').focus().select();
                self.$dialog.find('label').on('click', function () {
                    $(this).parent().find('.form-control:first').focus();
                });
            };
            this.show = function () {
                var $img = $($editable.data('target'));
                var imgInfo = {
                    imgDom: $img,
                    title: $img.attr('title'),
                    src: $img.attr('src'),
                    alt: $img.attr('alt'),
                    width: $img.attr('width'),
                    height: $img.attr('height'),
                    role: $img.attr('role'),
                    class: $img.attr('class'),
                    style: $img.attr('style'),
                    imgLink: $($img).parent().is("a") ? $($img).parent() : null
                };
                this.showImageAttributesDialog(imgInfo).then(function (imgInfo) {
                    ui.hideDialog(self.$dialog);
                    var $img = imgInfo.imgDom;
                    if (options.imageAttributesRemoveEmpty) {
                        if (imgInfo.alt) $img.attr('alt', imgInfo.alt); else $img.removeAttr('alt');
                        if (imgInfo.width) $img.attr('width', imgInfo.width); else $img.removeAttr('width');
                        if (imgInfo.height) $img.attr('height', imgInfo.height); else $img.removeAttr('height');
                        if (imgInfo.title) $img.attr('title', imgInfo.title); else $img.removeAttr('title');
                        if (imgInfo.src) $img.attr('src', imgInfo.src); else $img.attr('src', '#');
                        if (imgInfo.class) $img.attr('class', imgInfo.class); else $img.removeAttr('class');
                        if (imgInfo.style) $img.attr('style', imgInfo.style); else $img.removeAttr('style');
                        if (imgInfo.role) $img.attr('role', imgInfo.role); else $img.removeAttr('role');
                    } else {
                        if (imgInfo.src) $img.attr('src', imgInfo.src); else $img.attr('src', '#');
                        $img.attr('alt', imgInfo.alt);
                        $img.attr('width', imgInfo.width);
                        $img.attr('height', imgInfo.height);
                        $img.attr('title', imgInfo.title);
                        $img.attr('class', imgInfo.class);
                        $img.attr('style', imgInfo.style);
                        $img.attr('role', imgInfo.role);
                    }
                    if ($img.parent().is("a")) $img.unwrap();
                    if (imgInfo.linkHref) {
                        var linkBody = '<a';
                        if (imgInfo.linkClass) linkBody += ' class="' + imgInfo.linkClass + '"';
                        if (imgInfo.linkStyle) linkBody += ' style="' + imgInfo.linkStyle + '"';
                        linkBody += ' href="' + imgInfo.linkHref + '" target="' + imgInfo.linkTarget + '"';
                        if (imgInfo.linkRel) linkBody += ' rel="' + imgInfo.linkRel + '"';
                        if (imgInfo.linkRole) linkBody += ' role="' + imgInfo.linkRole + '"';
                        linkBody += '></a>';
                        $img.wrap(linkBody);
                    }
                    $note.val(context.invoke('code'));
                    $note.change();
                });
            };
            this.showImageAttributesDialog = function (imgInfo) {
                return $.Deferred(function (deferred) {
                    var $imageTitle = self.$dialog.find('.note-imageAttributes-title'),
                        $imageInput = self.$dialog.find('.note-imageAttributes-input'),
                        $imageSrc = self.$dialog.find('.note-imageAttributes-src'),
                        $imageAlt = self.$dialog.find('.note-imageAttributes-alt'),
                        $imageWidth = self.$dialog.find('.note-imageAttributes-width'),
                        $imageHeight = self.$dialog.find('.note-imageAttributes-height'),
                        $imageClass = self.$dialog.find('.note-imageAttributes-class'),
                        $imageStyle = self.$dialog.find('.note-imageAttributes-style'),
                        $imageRole = self.$dialog.find('.note-imageAttributes-role'),
                        $linkHref = self.$dialog.find('.note-imageAttributes-link-href'),
                        $linkTarget = self.$dialog.find('.note-imageAttributes-link-target'),
                        $linkClass = self.$dialog.find('.note-imageAttributes-link-class'),
                        $linkStyle = self.$dialog.find('.note-imageAttributes-link-style'),
                        $linkRel = self.$dialog.find('.note-imageAttributes-link-rel'),
                        $linkRole = self.$dialog.find('.note-imageAttributes-link-role'),
                        $editBtn = self.$dialog.find('.note-imageAttributes-btn');
                    $linkHref.val();
                    $linkClass.val();
                    $linkStyle.val();
                    $linkRole.val();
                    $linkTarget.val();
                    $linkRel.val();
                    if (imgInfo.imgLink) {
                        $linkHref.val(imgInfo.imgLink.attr('href'));
                        $linkClass.val(imgInfo.imgLink.attr('class'));
                        $linkStyle.val(imgInfo.imgLink.attr('style'));
                        $linkRole.val(imgInfo.imgLink.attr('role'));
                        $linkTarget.val(imgInfo.imgLink.attr('target'));
                        $linkRel.val(imgInfo.imgLink.attr('rel'));
                    }
                    ui.onDialogShown(self.$dialog, function () {
                        context.triggerEvent('dialog.shown');
                        $imageInput.replaceWith(
                            $imageInput.clone().on('change', function () {
                                var callbacks = options.callbacks;
                                if (callbacks.onImageUpload) {
                                    context.triggerEvent('image.upload', this.files[0]);
                                } else {
                                    readFileAsDataURL(this.files[0]).then(function (dataURL) {
                                        $imageSrc.val(dataURL);
                                    }).fail(function () {
                                        context.triggerEvent('image.upload.error');
                                    });
                                }
                            }).val('')
                        );
                        $editBtn.click(function (e) {
                            e.preventDefault();
                            deferred.resolve({
                                imgDom: imgInfo.imgDom,
                                title: $imageTitle.val(),
                                src: $imageSrc.val(),
                                alt: $imageAlt.val(),
                                width: $imageWidth.val(),
                                height: $imageHeight.val(),
                                class: $imageClass.val(),
                                style: $imageStyle.val(),
                                role: $imageRole.val(),
                                linkHref: $linkHref.val(),
                                linkTarget: $linkTarget.val(),
                                linkClass: $linkClass.val(),
                                linkStyle: $linkStyle.val(),
                                linkRel: $linkRel.val(),
                                linkRole: $linkRole.val()
                            }).then(function() {
                                context.triggerEvent('change', $editable.html());
                            })
                        });
                        $imageTitle.val(imgInfo.title);
                        $imageSrc.val(imgInfo.src);
                        $imageAlt.val(imgInfo.alt);
                        $imageWidth.val(imgInfo.width);
                        $imageHeight.val(imgInfo.height);
                        $imageClass.val(imgInfo.class);
                        $imageStyle.val(imgInfo.style);
                        $imageRole.val(imgInfo.role);
                        self.bindEnterKey($editBtn);
                        self.bindLabels();
                    });
                    ui.onDialogHidden(self.$dialog, function () {
                        $editBtn.off('click');
                        if (deferred.state() === 'pending') deferred.reject();
                    });
                    ui.showDialog(self.$dialog);
                });
            };
        }
    });
}));
