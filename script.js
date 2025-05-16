
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

/*
  if (btnResumen) {
    btnResumen.addEventListener('click', () => {
      const nombre = document.querySelector('input[type="text"]:nth-of-type(1)').value;
      const dni = document.querySelector('input[type="number"]:nth-of-type(2)').value;
      const cuil = document.querySelector('input[type="number"]:nth-of-type(3)').value;
      const direccion = document.querySelector('input[type="text"]:nth-of-type(4)').value;
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
*/
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
      const doc = new jsPDF();

     const nombre = document.getElementById("nombreSolicitante").value.trim();
const dni = document.getElementById("dniSolicitante").value.trim();
const cuil = document.getElementById("cuilSolicitante").value.trim();
const direccion = document.getElementById("direccionSolicitante").value.trim();
      const fecha = document.getElementById('fecha').value;
      const plazo = document.getElementById('plazoValidez').value;
      const formasPago = Array.from(document.querySelectorAll('input[name="pago"]:checked')).map(cb => cb.value).join(', ');
      const conformidad = document.querySelector('input[name="conformidad"]:checked')?.value || "No especificado";

      doc.setFontSize(16);
      doc.text("Presupuesto HUB DI UNLa", 10, 10);

      doc.setFontSize(12);
      let y = 20;
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
