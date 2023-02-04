<div aria-hidden="true" class="chat modal fade" id="modal-scrollable" style="display: none;" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Scrollable modal</h5>
                <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body">
                <ul class="conversation-list" data-simplebar="init" style="max-height: 460px;">
                    <div class="simplebar-wrapper" style="margin: 0px -15px;">
                        <div class="simplebar-height-auto-observer-wrapper">
                            <div class="simplebar-height-auto-observer"></div>
                        </div>
                        <div class="simplebar-mask">
                            <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                                <div aria-label="scrollable content" class="simplebar-content-wrapper" role="region" style="height: auto; overflow: hidden;" tabindex="0">
                                    <div class="simplebar-content" style="padding: 0px 15px;">
                                        <li class="clearfix odd">
                                            <div class="chat-avatar">
                                                <img alt="Geneva M" class="rounded" src="assets/images/users/user-1.jpg">
                                                <i>10:03</i></div>
                                            <div class="conversation-text">
                                                <div class="ctext-wrap"><i>Geneva M</i>
                                                    <p>Sure thing! let me know if 2pm works for you</p></div>
                                            </div>
                                            <div class="conversation-actions dropdown">
                                                <button aria-expanded="false" class="btn btn-sm btn-link" data-bs-toggle="dropdown">
                                                    <i class="mdi mdi-dots-vertical font-16"></i></button>
                                                <div class="dropdown-menu">
                                                    <a class="dropdown-item" href="#">Copy Message</a>
                                                    <a class="dropdown-item" href="#">Edit</a>
                                                    <a class="dropdown-item" href="#">Delete</a></div>
                                            </div>
                                        </li>
                                        <li class="clearfix">
                                            <div class="chat-avatar">
                                                <img alt="James Z" class="rounded" src="assets/images/users/user-5.jpg">
                                                <i>10:04</i></div>
                                            <div class="conversation-text">
                                                <div class="ctext-wrap"><i>James Z</i>
                                                    <p>Sorry, I have another meeting scheduled at 2pm. Can we have it at 3pm instead?</p>
                                                </div>
                                            </div>
                                            <div class="conversation-actions dropdown">
                                                <button aria-expanded="false" class="btn btn-sm btn-link" data-bs-toggle="dropdown">
                                                    <i class="mdi mdi-dots-vertical font-16"></i></button>
                                                <div class="dropdown-menu dropdown-menu-end">
                                                    <a class="dropdown-item" href="#">Copy Message</a>
                                                    <a class="dropdown-item" href="#">Edit</a>
                                                    <a class="dropdown-item" href="#">Delete</a></div>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="simplebar-placeholder" style="width: auto; height: 166px;"></div>
                    </div>
                    <div class="simplebar-track simplebar-horizontal" style="visibility: hidden;">
                        <div class="simplebar-scrollbar" style="width: 0px; display: none;"></div>
                    </div>
                    <div class="simplebar-track simplebar-vertical" style="visibility: hidden;">
                        <div class="simplebar-scrollbar" style="height: 0px; transform: translate3d(0px, 0px, 0px); display: none;"></div>
                    </div>
                </ul>
            </div>
            <div class="modal-footer" style="padding: 0;background-color: #f1f5f9">
                <div class="mt-2 p-3 w-100">
                    <form class="needs-validation" id="chat-form" name="chat-form">
                        <div class="row">
                            <div class="col mb-2 mb-sm-0">
                                <input class="form-control border-0" placeholder="Enter your text" type="text">
                                <div class="invalid-feedback">Please enter your messsage</div>
                            </div>
                            <div class="col-sm-auto">
                                <button class="btn btn-info w-100" type="submit" style="height: 100%">
                                    <i class="fa fa-upload"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>