const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const About = new Schema(
    {
        nameCompany: {
            type: String,
            default: 'Showroom ô tô LT - Công ty Cổ Phần Xuất Nhập Khẩu Xe LT',
        },
        phoneNumber: {
            type: String,
            default: '0364681528',
        },
        fax: {
            type: String,
            default: '(024) 3259.5889',
        },
        email: {
            type: String,
            default: 'builam022000@gmail.com',
        },
        address: {
            type: String,
            default:
                '99, đường số 7, P.Linh Trung, quận Thủ Đức, TP Hồ Chí Minh',
        },
        description: {
            type: String,
            default:
                'Công Ty Cổ Phần Xuất Nhập Xe LT được thành lập tháng 12 năm 2020 bởi một số cổ đông chủ chốt của công ty lớn giàu kinh nghiệm trong lĩnh vực ô tô như: Công ty LD SX ô tô Ngôi sao, Công ty LD Oto Deawoo (Vidamco), hệ thống showroom ô tô nhập khẩu LT, hệ thống cơ sở hạ tầng được xây dựng đồng bộ và hiện đại trên diện tích gần 4000 m2. Lĩnh vực hoạt động chủ yếu của công ty.',
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('About', About);
