exports.firstnameFormat = (firstname) => {
    return firstname.split('').map( (l, i) => {
        if (i === 0) {
            return l.toUpperCase();
        } else {
            return l.toLowerCase();
        }
    }).join('');
}

exports.drawNewDiagram = (canvas) => {
    const getCoordinates = (x, y) => {
        const newX = Math.floor((Math.random()+1)*16);
        const newY = Math.floor((Math.random()+1)*11);
        return [newX, newY];
    };

    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(10, 160);
        ctx.lineTo(260, 160);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(10, 160);
        ctx.lineTo(10, 10);
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = '#14CC74';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        let x = 8;
        let y = 4;
        const coordinates = [];
        ctx.moveTo(10, 160);
        for (let i = 0; i<17; i++) {
            const newCoord = getCoordinates(x, y);
            x = x + newCoord[0];
            y = y + newCoord[1];
            coordinates.push([x, y]);
        };

        window.setTimeout(() => {
            ctx.lineTo(10+coordinates[0][0], 160-coordinates[0][1]);
            ctx.stroke();
        }, 100);
        window.setTimeout(() => {
            ctx.lineTo(10+coordinates[1][0], 160-coordinates[1][1]);
            ctx.stroke();
        }, 200);
        window.setTimeout(() => {
            ctx.lineTo(10+coordinates[2][0], 160-coordinates[2][1]);
            ctx.stroke();
        }, 300);
        window.setTimeout(() => {
            ctx.lineTo(10+coordinates[3][0], 160-coordinates[3][1]);
            ctx.stroke();
        }, 400);
        window.setTimeout(() => {
            ctx.lineTo(10+coordinates[4][0], 160-coordinates[4][1]);
            ctx.stroke();
        }, 500);
        window.setTimeout(() => {
            ctx.lineTo(10+coordinates[5][0], 160-coordinates[5][1]);
            ctx.stroke();
        }, 600);
        window.setTimeout(() => {
            ctx.lineTo(10+coordinates[6][0], 160-coordinates[6][1]);
            ctx.stroke();
        }, 700);
        window.setTimeout(() => {
            ctx.lineTo(10+coordinates[7][0], 160-coordinates[7][1]);
            ctx.stroke();
        }, 800);
        window.setTimeout(() => {
            ctx.lineTo(10+coordinates[8][0], 160-coordinates[8][1]);
            ctx.stroke();
        }, 900);
        window.setTimeout(() => {
            ctx.lineTo(10+coordinates[9][0], 160-coordinates[9][1]);
            ctx.stroke();
        }, 1000);
        window.setTimeout(() => {
            ctx.lineTo(10+coordinates[10][0], 160-coordinates[10][1]);
            ctx.stroke();
        }, 1100);
        window.setTimeout(() => {
            ctx.lineTo(10+coordinates[11][0], 160-coordinates[11][1]);
            ctx.stroke();
        }, 1200);
        window.setTimeout(() => {
            ctx.lineTo(10+coordinates[12][0], 160-coordinates[12][1]);
            ctx.stroke();
        }, 1300);
        window.setTimeout(() => {
            ctx.lineTo(10+coordinates[13][0], 160-coordinates[13][1]);
            ctx.stroke();
        }, 1400);
        window.setTimeout(() => {
            ctx.lineTo(10+coordinates[14][0], 160-coordinates[14][1]);
            ctx.stroke();
        }, 1500);
        window.setTimeout(() => {
            ctx.lineTo(10+coordinates[15][0], 160-coordinates[15][1]);
            ctx.stroke();
        }, 1600);

        
        ctx.closePath();
        
    } else {
        // kod z obrazkiem
    }
}