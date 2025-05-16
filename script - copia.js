
document.addEventListener('DOMContentLoaded', () => {
  const btnResumen = document.getElementById('btnResumen');
  const btnPresupuesto = document.getElementById('btnPresupuesto');

  if (btnResumen) {
    btnResumen.addEventListener('click', () => {
      const nombre = document.getElementById("nombreSolicitante").value.trim();
      const dni = document.getElementById("dniSolicitante").value.trim();
      const cuil = document.getElementById("cuilSolicitante").value.trim();
      const direccion = document.getElementById("direccionSolicitante").value.trim();
      const fecha = document.getElementById('fecha').value;
      const plazo = document.getElementById('plazoValidez').value;
      const formasPago = Array.from(document.querySelectorAll('input[name="pago"]:checked')).map(cb => cb.value);
      const conformidad = document.querySelector('input[name="conformidad"]:checked')?.value || "No especificado";

      const datosHTML = `
        <li><strong>Apellido y Nombre:</strong> ${nombre}</li>
        <li><strong>DNI:</strong> ${dni}</li>
        <li><strong>CUIL:</strong> ${cuil}</li>
        <li><strong>Dirección:</strong> ${direccion}</li>
        <li><strong>Fecha:</strong> ${fecha}</li>
        <li><strong>Plazo de validez:</strong> ${plazo}</li>
        <li><strong>Forma de pago:</strong> ${formasPago.join(', ') || 'No especificada'}</li>
        <li><strong>¿Presto conformidad?:</strong> ${conformidad}</li>
      `;
      document.getElementById('datosPersona').innerHTML = datosHTML;
      document.getElementById('resumenSolicitante').classList.remove('hidden');
    });
  }

  if (btnPresupuesto) {
    btnPresupuesto.addEventListener('click', async () => {
      const emailInput = document.getElementById('emailSolicitante');
      const emailSolicitante = emailInput.value.trim();

      if (!emailSolicitante || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailSolicitante)) {
        alert("Por favor, ingresá un correo electrónico válido.");
        emailInput.classList.add("border-red-500");
        return;
      } else {
        emailInput.classList.remove("border-red-500");
      }

      

      const { jsPDF } = window.jspdf;
     const doc = new jsPDF({ orientation: "landscape" });

      // Imágenes en base64
      const firmaImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUgAAABDCAYAAABcPMrJAAABtElEQVR4nO3XQQ6DIBQFUJjwO/dD8w+TMI+0dCUY+eWxd8glubdNxZJhAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwF/t48LG2UkmS5Ha3xn1f0tJ++5KRi+ZPjtnc9Xxd/m0qlWq1Wq1Wq1Wq9XyMZySJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmS3U3fRABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8XfgCOvPAc9vx4nAAAAAElFTkSuQmCC";

      const hubImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAAA9CAYAAACzSAj3AAABY0lEQVR4nO3YsQ3CMBAF0SJSnMgA3NBSZB3ACux8m5TRDEME+VuX0Wy2ydXn+df5fAxERERERERERERERERER8XtGuVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3iVEeVsxE8E3j+UreERERERERERERERERETkV/wAHqxGpZ3cqRAAAAAElFTkSuQmCC";
       "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAA9klEQVR4nO3SsQ0AIBAEwT4Kk0TAHuWrjGCCFYeyNLsYp7j+Px8fHx8fHx8fHw9/n8vP29fHw9fX2+/Xz8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fH//2Q==";
      
      const ladImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYEAAAGBCAIAAAAPO5pzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAG42lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDMgNzkuOTY5MGE4NywgMjAyNS8wMy8wNi0xOToxMjowMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZjlkMDRjODEtNzJiYi00MWQwLWI4NjctNjM1ODk2YWZhZjNhIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6OTU1MzRhMTUtOTE5Yi1iMjRiLWFkYTEtOTAzYmMyNmZkNTA1IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNlMDZjNjkwLWQyMGYtYTg0Yi1hNjY3LTJkMmNlYmFjZmY3OSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjUtMDUtMDlUMTI6Mjk6NTgtMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI1LTA1LTA5VDEyOjQ0OjE4LTAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI1LTA1LTA5VDEyOjQ0OjE4LTAzOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRmMGU3OWUyLWIzMzktNDJlZS1iYzNiLTU1NjI3MzNjMjJhMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpmOWQwNGM4MS03MmJiLTQxZDAtYjg2Ny02MzU4OTZhZmFmM2EiLz4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YTgxOThlMzktOGU2NC1jODRhLWE0ZTktNTllMmQ2NzQ2NWMzIiBzdEV2dDp3aGVuPSIyMDI1LTA1LTA5VDEyOjQ0OjE4LTAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjYuNyAoMjAyNTA1MDQubS4zMDY0IDA0ZTZlMjkpICAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjNlMDZjNjkwLWQyMGYtYTg0Yi1hNjY3LTJkMmNlYmFjZmY3OSIgc3RFdnQ6d2hlbj0iMjAyNS0wNS0wOVQxMjo0NDoxOC0wMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI2LjcgKDIwMjUwNTA0Lm0uMzA2NCAwNGU2ZTI5KSAgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w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";
      // Agregar logos
      doc.addImage(hubImg, "PNG", 40, 10, 25, 25);
      doc.addImage(ladImg, "PNG", 70, 10, 25, 25);

      const nombre = document.getElementById("nombreSolicitante").value.trim();
      const dni = document.getElementById("dniSolicitante").value.trim();
      const cuil = document.getElementById("cuilSolicitante").value.trim();
      const direccion = document.getElementById("direccionSolicitante").value.trim();
      const fecha = document.getElementById('fecha').value;
      const plazo = document.getElementById('plazoValidez').value;
      const formasPago = Array.from(document.querySelectorAll('input[name="pago"]:checked')).map(cb => cb.value).join(', ');
      const conformidad = document.querySelector('input[name="conformidad"]:checked')?.value || "No especificado";

      doc.setFontSize(16);
      doc.text("Presupuesto HUB DI UNLa", 10, 45);

      doc.setFontSize(12);
      let y = 55;
      const datos = [
        `Nombre: ${nombre}`,
        `DNI: ${dni}`,
        `CUIL: ${cuil}`,
        `Dirección: ${direccion}`,
        `Fecha: ${fecha}`,
        `Plazo de validez: ${plazo}`,
        `Forma de pago: ${formasPago}`,
        `¿Presto conformidad?: ${conformidad}`,
        `Email: ${emailSolicitante}`,
      ];
      datos.forEach(d => {
        doc.text(d, 10, y);
        y += 7;
      });

      const rows = [];
      document.querySelectorAll('.item').forEach(fila => {
        const proceso = fila.querySelector('.proceso').value;
        const material = fila.querySelector('.material').value;
        const tamanio = fila.querySelector('.tamanio').value;
        const complejidad = fila.querySelector('.complejidad').value;
        const plano = fila.querySelector('.plano').checked ? "Sí" : "No";
        const materialPropio = fila.querySelector('.material-propio').checked ? "Sí" : "No";
        const subtotal = fila.querySelector('.subtotal').textContent;
        rows.push([proceso, material, tamanio, complejidad, plano, materialPropio, subtotal]);
      });

      doc.text("Detalle de servicios:", 10, y + 5);
      y += 10;
      const startX = 10;
      const colWidths = [30, 30, 20, 25, 25, 25, 25];
      const headers = ["Proceso", "Material", "Tamaño", "Complejidad", "Plano", "Material", "Subtotal"];
      headers.forEach((h, i) => {
        doc.text(h, startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0), y);
      });
      y += 6;
      rows.forEach(row => {
        row.forEach((text, i) => {
          doc.text(String(text), startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0), y);
        });
        y += 6;
      });

      y += 4;
      const total = document.getElementById("totalFinal").textContent;
      doc.setFontSize(13);
      doc.text(`Total: ${total}`, 10, y);

      // Firma del HUB al final del documento
      doc.addImage(firmaImg, "PNG", 140, 250, 50, 20);

      const pdfBlob = doc.output("blob");
      const formData = new FormData();
      formData.append("pdf", pdfBlob, "presupuesto.pdf");
      formData.append("email", emailSolicitante);

      console.log("Enviando a backend:", emailSolicitante, formData);

      try {
        const response = await fetch("https://backend-hubdi.onrender.com/enviar-presupuesto", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("El presupuesto ha sido enviado por correo electrónico.");
        } else {
          alert("Error al enviar el presupuesto.");
        }
      } catch (error) {
        console.error("Error al enviar el presupuesto:", error);
        alert("Error al enviar el presupuesto.");
      }
    });
  }
});

window.addEventListener("DOMContentLoaded", agregarFila);

/* otra version */




const { jsPDF } = window.jspdf;
const doc = new jsPDF({ orientation: "landscape" });

const ladLogo = "data:image/png;base64, ... "; // base64 del LAD
const firmaHub = "data:image/png;base64, ... "; // base64 de la firma

const ladImg = new Image();
const firmaImg = new Image();
let ladCargado = false;
let firmaCargada = false;

const intentarGenerarPDF = () => {
  if (!ladCargado || !firmaCargada) return;

  doc.addImage(ladImg, 'PNG', 10, 10, 40, 20);
  doc.addImage(firmaImg, 'PNG', 240, 180, 40, 20);

  // CONTINÚA CON EL CÓDIGO ORIGINAL
  const nombre = document.getElementById("nombreSolicitante").value.trim();
  const dni = document.getElementById("dniSolicitante").value.trim();
  const cuil = document.getElementById("cuilSolicitante").value.trim();
  const direccion = document.getElementById("direccionSolicitante").value.trim();
  const fecha = document.getElementById('fecha').value;
  const plazo = document.getElementById('plazoValidez').value;
  const formasPago = Array.from(document.querySelectorAll('input[name="pago"]:checked')).map(cb => cb.value).join(', ');
  const conformidad = document.querySelector('input[name="conformidad"]:checked')?.value || "No especificado";

  doc.setFontSize(16);
  doc.text("Presupuesto HUB DI UNLa", 10, 40);

  doc.setFontSize(12);
  let y = 50;
  const datos = [
    `Nombre: ${nombre}`,
    `DNI: ${dni}`,
    `CUIL: ${cuil}`,
    `Dirección: ${direccion}`,
    `Fecha: ${fecha}`,
    `Plazo de validez: ${plazo}`,
    `Forma de pago: ${formasPago}`,
    `¿Presto conformidad?: ${conformidad}`,
    `Email: ${emailSolicitante}`,
  ];
  datos.forEach(d => {
    doc.text(d, 10, y);
    y += 7;
  });

  // (el resto de tu código con filas, totales...)

  const total = document.getElementById("totalFinal").textContent;
  doc.setFontSize(13);
  doc.text(`Total: ${total}`, 10, y + 10);

  const pdfBlob = doc.output("blob");
  const formData = new FormData();
  formData.append("pdf", pdfBlob, "presupuesto.pdf");
  formData.append("email", emailSolicitante);

  fetch("https://backend-hubdi.onrender.com/enviar-presupuesto", {
    method: "POST",
    body: formData,
  })
    .then(res => {
      if (res.ok) {
        alert("El presupuesto ha sido enviado por correo electrónico.");
      } else {
        alert("Error al enviar el presupuesto.");
      }
    })
    .catch(err => {
      console.error("Error al enviar el presupuesto:", err);
      alert("Error al enviar el presupuesto.");
    });
};

ladImg.onload = () => {
  ladCargado = true;
  intentarGenerarPDF();
};
firmaImg.onload = () => {
  firmaCargada = true;
  intentarGenerarPDF();
};

ladImg.src = ladLogo;
firmaImg.src = firmaHub;
