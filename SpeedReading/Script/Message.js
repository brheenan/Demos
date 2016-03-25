


/* ----------------------------------------------------------- Introduction Messages --- */

function BillboardMessages() {



    this.BlankMessage = function () {

        var message = "";

        message += "                ";
        message += "                ";
        message += "                ";
        message += "                ";
        message += "                ";
        message += "                ";

        return (message);
    }



    this.SpeedReadingQuestion = function () {

        var message = "";

        message += "                ";
        message += " CAN YOUR       ";
        message += " BROWSER        ";
        message += " SPEED READ?    ";
        message += "                ";
        message += "                ";

        return (message);
    }



    /* ---------- Feature Introduction ---------- */


    this.Ready = function () {

        var message = "";

        message += "                ";
        message += "                ";
        message += "     READY      ";
        message += "                ";
        message += "                ";
        message += "                ";

        return (message);
    }



    this.Set = function () {

        var message = "";

        message += "                ";
        message += "                ";
        message += "      SET       ";
        message += "                ";
        message += "                ";
        message += "                ";

        return (message);
    }



    this.Go = function () {

        var message = "";

        message += "                ";
        message += "                ";
        message += "      GO        ";
        message += "                ";
        message += "                ";
        message += "                ";

        return (message);
    }





    /* ---------- CSS3 Support ---------- */

    this.Overview01 = function () { return ("There are over  one billion     Windows         customers in    the world today.                "); }
    this.Overview02 = function () { return ("Most of them    spend more time browsing the webthan any other  activity on     their computer. "); }
    this.Overview03 = function () { return ("We build        Windows         Internet        Explorer for    these customers.                "); }
    this.Overview04 = function () { return ("Our goal is     for the same    markup to createinteroperable   HTML5 web sites.                "); }
    this.Overview05 = function () { return ("We want to      unlock the      potential of    modern PC       hardware for    web developers. "); }
    this.Overview06 = function () { return ("Our redesigned  experience puts the web first   and lets your   sites shine.                    "); }
    this.Overview07 = function () { return ("All while       continuing our  industry        leadership as   the worlds most trusted browser."); }
    this.Overview08 = function () { return ("We should also  mention a few   other things:                                                   "); }
    this.GPUPowered = function () { return ("GPU Powered      -Graphics       -Canvas         -SVG            -Video          -Text          "); }
    this.JavaScript = function () { return ("New JavaScript   -True Compiler  -Fast Interpret -ECMAScript5    -Machine Code   -Chakra        "); }

    this.CSS3Support = function () { return ("CSS3             -Backgrounds    -Borders        -Color          -Fonts          -Media         "); }
    this.DOMSupport1 = function () { return ("DOM L2/L3        -Core           -Events         -HTML           -Element        -Style         "); }
    this.DOMSupport2 = function () { return ("DOM L2/L3        -Traversal      -Range          -L3Core         -L3Events       -Whitespace    "); }

    /* ---------- Dynamic message function ----------- */

    this.getMessage = function (i) {
        switch (i) {
            case 0: //   ||||||||||||||||----------------||||||||||||||||----------------||||||||||||||||----------------
                return ("                Over 200 million devices are on    Windows 10        today.                     ");
            case 1:
                return (" Most Windows    users spend     the most time   browsing        the web.                       ");
            case 2:
                return ("So we built     Microsoft Edge  to be a faster  safer browser   that goes       beyond browsing.");
            case 3:
                return ("Your personal   assistant       Cortana         is built        right into      Microsoft Edge. ");
            case 4:
                return (" You can write   directly on     webpages        and share your  notes with      friends.       ");
            case 5:
                return ("Save what you   want to your    Reading list andread it later   on any device.                  ");
            case 6:
                return (" Reading view    gets rid of     distractions    and puts your   content first.                 ");
            case 7:
                return ("Our goal is  to make the safest fastest         web browser     for Windows 10.                 ");
            case 8:
                return ("And to create a modern browser  for web devs    that supports   todays          standards.      ");
            case 9:
                return ("Thats why we    made over       5000 interop    improvements in Microsoft Edge.                 ");
            case 10:
                return ("                We should also  mention a few   other           improvements...                 ");
            case 11:
                return ("GPU Powered      -Graphics       -Canvas         -SVG            -Video          -Text          ");
            case 12:
                return ("New JavaScript   -True Compiler  -Fast Interpret -ECMAScript5    -Machine Code   -Chakra        ");
            case 13:
                return ("CSS3             -Backgrounds    -Borders        -Color          -Fonts          -Media         ");
            case 14:
                return ("DOM L2/L3        -Core           -Events         -HTML           -Element        -Style         ");
            case 15:
                return ("DOM L2/L3        -Traversal      -Range          -L3Core         -L3Events       -Whitespace    ");
            /*
            case 0:
                return ("There are over  one billion     Windows         customers in    the world today.                ");
            case 1:
                return ("Most of them    spend more time browsing the webthan any other  activity on     their computer. ");
            case 2:
                return ("We build        Windows         Internet        Explorer for    these customers.                ");
            case 3:
                return ("Our goal is     for the same    markup to createinteroperable   HTML5 web sites.                ");
            case 4:
                return ("We want to      unlock the      potential of    modern PC       hardware for    web developers. ");
            case 5:
                return ("Our redesigned  experience puts the web first   and lets your   sites shine.                    ");
            case 6:
                return ("All while       continuing our  industry        leadership as   the worlds most trusted browser.");
            case 7:
                return ("We should also  mention a few   other things:                                                   ");
            case 8:
                return ("GPU Powered      -Graphics       -Canvas         -SVG            -Video          -Text          ");
            case 9:
                return ("New JavaScript   -True Compiler  -Fast Interpret -ECMAScript5    -Machine Code   -Chakra        ");
            case 10:
                return ("CSS3             -Backgrounds    -Borders        -Color          -Fonts          -Media         ");
            case 11:
                return ("DOM L2/L3        -Core           -Events         -HTML           -Element        -Style         ");
            case 12:
                return ("DOM L2/L3        -Traversal      -Range          -L3Core         -L3Events       -Whitespace    ");
            */
            default:
                return ("                                                                                                ");
        }
    }

    this.ifEdgeMessage = function () {

        var message = "";

        message += "================";
        message += "  If you were   ";
        message += "  using Edge    ";
        message += "  you would be  ";
        message += "  done by now   ";
        message += "================";

        return (message);
    }



    /* ---------- Billboard Features ---------- */



    this.BillboardUppercase = function () {

        var message = "";

        message += "                ";
        message += " Uppercase      ";
        message += "                ";
        message += " ABCDEFGHIJKLM  ";
        message += " NOPQRSTUVWXYZ  ";
        message += "                ";

        return (message);
    }



    this.BillboardLowercase = function () {

        var message = "";

        message += "                ";
        message += " Lowercase      ";
        message += "                ";
        message += " abcdefghijklm  ";
        message += " nopqrstuvwxyz  ";
        message += "                ";

        return (message);
    }


    this.BillboardNumbers = function () {

        var message = "";

        message += "                ";
        message += " Numbers        ";
        message += "                ";
        message += " 1234567890     ";
        message += "                ";
        message += "                ";

        return (message);
    }



    this.BillboardSymbols = function () {

        var message = "";

        message += "                ";
        message += " Symbols        ";
        message += "                ";
        message += " :<=>?@[.]^_`;  ";
        message += "                ";
        message += "                ";

        return (message);
    }

    /* ---------- Custom Messages ---------- */



    this.HelloSanFrancisco = function () {

        var message = "";

        message += "                ";
        message += " Hello          ";
        message += " San Francisco  ";
        message += "                ";
        message += "                ";
        message += "                ";

        return (message);
    }


}

