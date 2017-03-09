/*global document, window*/
/**
 * devRant Plus
 *
 * devRant Plus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 *
 * Easy Digital Downloads is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Easy Digital Downloads. If not, see <http://www.gnu.org/licenses/>.
 *
 * @summary     Adds functionality to the devRant website
 * @since       1.0.0
 */


'use strict';


// Determind what page we are viewing
let page;

if(document.getElementsByClassName('addcomment-btn').length) {
    page = 'single';
} else if(document.getElementsByClassName('addrant-btn').length) {
    page = 'feed';
} else if(document.getElementsByClassName('profile-bar').length) {
    page = 'profile';
}


/**
 * Scripts specific to the feed and rant pages
 *
 * @since       1.0.0
 */
let feedScripts = {
    init : function() {
        if(page === 'single') {
            let rant = document.getElementsByClassName('body-col2')[0].getAttribute('data-id');

            this.addBackButton(rant);
        } else if(page === 'feed') {
            this.autoScroll();
        }

        this.fixLinks();
    },
    /**
     * Adds the back button to individual rants
     *
     * @since       1.0.0
     * @param       {string} rant The ID of the rant we are viewing
     * @return      {void}
     */
     addBackButton : function(rant) {
        let backURL = document.referrer;

        if (backURL !== '' && backURL.indexOf('devrant.io') !== -1) {
            let backButton = document.createElement('li');
            backButton.className = 'feed-prev-more';

            let backButtonLink = document.createElement('a');
            backButtonLink.className = 'feed-prev';
            backButtonLink.setAttribute('href', document.referrer + '#' + rant);

            let backButtonIcon = document.createElement('span');
            backButtonIcon.className = 'icon-back2 icon';

            backButtonLink.appendChild(backButtonIcon);

            let backButtonText = document.createElement('span');
            backButtonText.className = 'feed-prev-more-link';
            backButtonText.textContent = 'Back';

            backButtonLink.appendChild(backButtonText);

            backButton.appendChild(backButtonLink);

            let clearfix = document.createElement('div');
            clearfix.className = 'clearfix';

            backButton.appendChild(clearfix);

            let placeholder = document.getElementsByClassName('rantlist')[0];
            placeholder.appendChild(backButton);
        }
    },
    /**
     * Auto-scrolls feed to last viewed when back button is pressed
     *
     * @since       1.0.0
     */
    autoScroll : function() {
        // Parse rant ID from URL
        let url = window.location.href;
        let rant = url.split('#');

        // Only run if this is ACTUALLY a rant
        if (rant.length === 2) {
            let rants = document.getElementsByClassName('rant-comment-row-widget');

            if (rants.length) {
                for (let row of Object.values(rants)) {
                    if(row.getAttribute('data-id') === rant[1]) {
                        row.scrollIntoView({ block: 'start', behavior: 'smooth' });
                    }
                }
            }
        }
    },
    /**
     * Fixes links to open externally
     *
     * @since       1.0.0
     */
    fixLinks : function() {
        let links = document.getElementsByTagName('a');

        for (let link of Object.values(links)) {
            if (link.href && link.href.indexOf('devrant.io') === -1) {
                link.target = '_blank';
            }
        }
    }
};
feedScripts.init();


/**
 * Scripts specific the about page
 *
 * @since       1.0.0
 */
let aboutScripts = {
    init : function() {
        if (page === 'profile') {
            this.addProfileLink();
        }
    },
    addProfileLink : function() {
        let username = document.getElementsByClassName('username-profile')[0].textContent;

        if (username === 'ghost1227') {
            let profileLink = document.createElement('div');
            profileLink.className = 'devrant-plus-profile-integration';

            let profileLinkButton = document.createElement('a');
            profileLinkButton.setAttribute('href', 'https://github.com/Section214/devrant-plus/issues');
            profileLinkButton.target = '_blank';
            profileLinkButton.textContent = 'Hey there! If you\'re seeing this, you\'re using my devRant Plus plugin for Firefox. Congratulations! If you have questions about this plugin, or have an idea for a new integration, click here and let me know!';

            profileLink.appendChild(profileLinkButton);

            let placeholder = document.getElementsByClassName('profile-detail-col2')[0];
            placeholder.appendChild(profileLink);
        }
    }
};
aboutScripts.init();
