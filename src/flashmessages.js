import React from "react";

function exp() {
    return (
        <>
            {% with messages = get_flashed_messages(with_categories=true) %} {% if
    messages %} {% for category, message in messages %} {% if category ==
    'error' %}
            <div class="alert alert-danger alter-dismissable fade show" role="alert">
                {{ message }}
                <button type="button" class="close" data-dismiss="alert">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            {% else %}
            <div class="alert alert-success alter-dismissable fade show" role="alert">
                {{ message }}
                <button type="button" class="close" data-dismiss="alert">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            {% endif %} {% endfor %} {% endif %} {% endwith %}
        </>
    );
}