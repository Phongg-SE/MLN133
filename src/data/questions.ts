export interface Question {
  id: number;
  level: number;
  category: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0: A, 1: B, 2: C, 3: D
  explanation: string;
  pageRef?: string;
}

export const CHAPTER_NAMES: Record<number, string> = {
  1: "Chương 1: Nhập môn Chủ nghĩa Xã hội Khoa học",
  2: "Chương 2: Sứ mệnh Lịch sử của Giai cấp Công nhân",
  3: "Chương 3: CNXH và Thời kỳ Quá độ lên CNXH",
  4: "Chương 4: Dân chủ XHCN và Nhà nước XHCN",
  5: "Chương 5: Cơ cấu Xã hội - Giai cấp & Liên minh Giai cấp",
  6: "Chương 6: Vấn đề Dân tộc và Tôn giáo",
  7: "Chương 7: Vấn đề Gia đình trong Thời kỳ Quá độ"
};

export const QUESTIONS_DATA: Question[] = [
  // --- CHƯƠNG 1 ---
  {
    id: 1,
    level: 1,
    category: CHAPTER_NAMES[1],
    question: "Theo nghĩa hẹp, chủ nghĩa xã hội khoa học được hiểu là gì?",
    options: [
      "Toàn bộ chủ nghĩa Mác - Lênin",
      "Một trong ba bộ phận hợp thành chủ nghĩa Mác - Lênin",
      "Chỉ là phong trào đấu tranh tự phát của công nhân",
      "Một học thuyết chỉ nghiên cứu kinh tế tư bản chủ nghĩa"
    ],
    correctAnswer: 1,
    explanation: "Theo nghĩa hẹp, CNXH khoa học là một trong ba bộ phận hợp thành chủ nghĩa Mác - Lênin (cùng với Triết học Mác - Lênin và Kinh tế chính trị Mác - Lênin).",
    pageRef: "6"
  },
  {
    id: 2,
    level: 1,
    category: CHAPTER_NAMES[1],
    question: "Điều kiện kinh tế - xã hội trực tiếp thúc đẩy sự ra đời của chủ nghĩa xã hội khoa học vào những năm 40 thế kỷ XIX là gì?",
    options: [
      "Chế độ phong kiến châu Âu bước vào thời kỳ hưng thịnh",
      "Cách mạng công nghiệp làm lực lượng sản xuất phát triển và giai cấp công nhân trở thành lực lượng chính trị độc lập",
      "Các cuộc cách mạng tư sản hoàn toàn chấm dứt",
      "Mâu thuẫn giữa công nhân và tư sản đã được điều hòa"
    ],
    correctAnswer: 1,
    explanation: "Cách mạng công nghiệp làm lực lượng sản xuất TBCN phát triển mạnh, làm gia tăng mâu thuẫn giai cấp và thúc đẩy phong trào công nhân xuất hiện đòi hỏi lý luận khoa học soi đường.",
    pageRef: "6, 8"
  },
  {
    id: 3,
    level: 1,
    category: CHAPTER_NAMES[1],
    question: "Sự thay đổi khẩu hiệu của phong trào công nhân Lyon từ năm 1831 đến năm 1834 phản ánh điều gì?",
    options: [
      "Phong trào chuyển từ đấu tranh kinh tế sang mục tiêu chính trị",
      "Phong trào từ bỏ hoàn toàn các yêu sách của công nhân",
      "Giai cấp tư sản chủ động nhượng bộ toàn bộ quyền lợi",
      "Công nhân chỉ đòi hỏi tăng lương đơn thuần"
    ],
    correctAnswer: 0,
    explanation: "Năm 1831 công nhân Lyon đòi 'Sống có việc làm hay chết trong đấu tranh', đến 1834 đã hô 'Cộng hòa hay là chết', chuyển biến rõ rệt từ tự phát sang đấu tranh chính trị.",
    pageRef: "7"
  },
  {
    id: 4,
    level: 1,
    category: CHAPTER_NAMES[1],
    question: "Tiền đề tư tưởng - lý luận trực tiếp cho sự ra đời của chủ nghĩa xã hội khoa học là gì?",
    options: [
      "Triết học cổ điển Đức",
      "Kinh tế chính trị cổ điển Anh",
      "Chủ nghĩa xã hội không tưởng - phê phán Pháp và Anh",
      "Triết học khai sáng Pháp"
    ],
    correctAnswer: 2,
    explanation: "Chủ nghĩa xã hội không tưởng - phê phán với các đại biểu Saint-Simon, Fourier, Owen chính là tiền đề lý luận trực tiếp nhất cho sự ra đời của CNXH khoa học.",
    pageRef: "8, 9"
  },
  {
    id: 5,
    level: 1,
    category: CHAPTER_NAMES[1],
    question: "Hai phát kiến vĩ đại của C.Mác và Ph.Ăngghen tạo cơ sở lý luận cho sự ra đời của CNXH khoa học là gì?",
    options: [
      "Chủ nghĩa duy vật lịch sử và Học thuyết giá trị thặng dư",
      "Học thuyết giá trị và Thuyết tương đối",
      "Phép biện chứng duy tâm và Thuyết tiến hóa",
      "Học thuyết nhà nước và Thuyết phân chia quyền lực"
    ],
    correctAnswer: 0,
    explanation: "Chủ nghĩa duy vật lịch sử và Học thuyết giá trị thặng dư là hai phát kiến vĩ đại đầu tiên giúp C.Mác và Ph.Ăngghen chuyển CNXH từ không tưởng thành khoa học.",
    pageRef: "10, 11"
  },
  {
    id: 6,
    level: 1,
    category: CHAPTER_NAMES[1],
    question: "Tác phẩm nào đánh dấu sự ra đời chính thức của chủ nghĩa xã hội khoa học?",
    options: [
      "Tư bản (Das Kapital)",
      "Tuyên ngôn của Đảng Cộng sản (1848)",
      "Chống Đuy-rinh",
      "Tình cảnh giai cấp công nhân Anh"
    ],
    correctAnswer: 1,
    explanation: "Tác phẩm 'Tuyên ngôn của Đảng Cộng sản' do C.Mác và Ph.Ăngghen soạn thảo xuất bản tháng 2/1848 đánh dấu sự ra đời chính thức của CNXH khoa học.",
    pageRef: "11"
  },
  {
    id: 7,
    level: 1,
    category: CHAPTER_NAMES[1],
    question: "Đối tượng nghiên cứu của chủ nghĩa xã hội khoa học là gì?",
    options: [
      "Các quy luật kinh tế chung của các hình thái kinh tế - xã hội",
      "Các quy luật chính trị - xã hội của quá trình phát sinh, hình thành và phát triển hình thái kinh tế - xã hội cộng sản chủ nghĩa",
      "Các quy luật duy tâm của nhận thức con người",
      "Quy luật vận động của tự nhiên"
    ],
    correctAnswer: 1,
    explanation: "Đối tượng nghiên cứu của CNXH khoa học là các quy luật chính trị - xã hội của quá trình chuyển biến từ TBCN lên CNXH và CNCS.",
    pageRef: "14"
  },
  {
    id: 8,
    level: 1,
    category: CHAPTER_NAMES[1],
    question: "V.I.Lênin có đóng góp vĩ đại nào trong việc phát triển CNXH khoa học giai đoạn lịch sử mới?",
    options: [
      "Bảo vệ và phát triển lý luận Mác, lãnh đạo Cách mạng Tháng Mười Nga 1917 thành công",
      "Sáng lập ra học thuyết giá trị thặng dư",
      "Sáng tạo ra phép biện chứng duy tâm",
      "Đưa ra học thuyết phân chia 3 quyền độc lập"
    ],
    correctAnswer: 0,
    explanation: "V.I.Lênin phát triển CNXH khoa học trong thời kỳ đế quốc chủ nghĩa và lãnh đạo thành công Cách mạng Tháng Mười Nga 1917, biến CNXH từ lý luận thành thực tiễn.",
    pageRef: "18-22"
  },
  {
    id: 9,
    level: 1,
    category: CHAPTER_NAMES[1],
    question: "Phương pháp nghiên cứu đặc thù và quan trọng hàng đầu của chủ nghĩa xã hội khoa học là gì?",
    options: [
      "Phương pháp logic kết hợp với lịch sử",
      "Phương pháp thực nghiệm sinh học",
      "Phương pháp toán học thống kê thuần túy",
      "Phương pháp phỏng vấn tâm lý"
    ],
    correctAnswer: 0,
    explanation: "Phương pháp kết hợp logic và lịch sử giúp làm rõ bản chất quy luật chính trị - xã hội trong sự phát triển lịch sử cụ thể.",
    pageRef: "16"
  },
  {
    id: 10,
    level: 1,
    category: CHAPTER_NAMES[1],
    question: "Ý nghĩa của việc nghiên cứu chủ nghĩa xã hội khoa học đối với sinh viên Việt Nam hiện nay là gì?",
    options: [
      "Trang bị bản lĩnh chính trị, niềm tin khoa học vào mục tiêu con đường đi lên CNXH của Đất nước",
      "Chỉ để học thuộc lòng thi lấy điểm",
      "Không có giá trị thực tiễn",
      "Thay thế cho toàn bộ kiến thức chuyên ngành khác"
    ],
    correctAnswer: 0,
    explanation: "Việc nghiên cứu CNXH khoa học giúp thế hệ trẻ củng cố niềm tin khoa học, định hướng tư tưởng và trách nhiệm công dân trong công cuộc đổi mới.",
    pageRef: "24-25"
  },

  // --- CHƯƠNG 2 ---
  {
    id: 11,
    level: 2,
    category: CHAPTER_NAMES[2],
    question: "Theo quan điểm Mác - Lênin, giai cấp công nhân là tập đoàn xã hội hình thành và phát triển gắn liền với quy trình nào?",
    options: [
      "Nền sản xuất đại công nghiệp",
      "Nền kinh tế nông nghiệp tiểu nông",
      "Thương nghiệp thủ công nghiệp",
      "Kinh tế săn bắt hái lượm"
    ],
    correctAnswer: 0,
    explanation: "Giai cấp công nhân là sản phẩm và là chủ thể của nền sản xuất đại công nghiệp hiện đại.",
    pageRef: "32"
  },
  {
    id: 12,
    level: 2,
    category: CHAPTER_NAMES[2],
    question: "Về phương thức lao động, giai cấp công nhân mang đặc trưng cơ bản nào?",
    options: [
      "Lao động thủ công gia đình",
      "Trực tiếp hay gián tiếp vận hành các công cụ sản xuất có tính chất công nghiệp ngày càng hiện đại và xã hội hóa cao",
      "Lao động tự do không chịu sự quản lý",
      "Chỉ làm công việc quản lý hành chính"
    ],
    correctAnswer: 1,
    explanation: "Giai cấp công nhân là lực lượng trực tiếp hoặc gián tiếp vận hành máy móc công nghiệp hiện đại.",
    pageRef: "33"
  },
  {
    id: 13,
    level: 2,
    category: CHAPTER_NAMES[2],
    question: "Về vị trí trong quan hệ sản xuất TBCN, giai cấp công nhân là giai cấp:",
    options: [
      "Sở hữu hầu hết tư liệu sản xuất chủ yếu",
      "Không có tư liệu sản xuất, phải bán sức lao động cho nhà tư bản và bị bóc tách giá trị thặng dư",
      "Nắm giữ toàn bộ bộ máy nhà nước tư sản",
      "Lực lượng bóc thặng dư của nhà tư bản"
    ],
    correctAnswer: 1,
    explanation: "Trong TBCN, công nhân không sở hữu TLSX, phải bán sức lao động và bị giai cấp tư sản bóc thặng dư.",
    pageRef: "34"
  },
  {
    id: 14,
    level: 2,
    category: CHAPTER_NAMES[2],
    question: "Nội dung tổng quát sứ mệnh lịch sử của giai cấp công nhân là gì?",
    options: [
      "Lãnh đạo nhân dân lao động xóa bỏ chế độ bóc phốt TBCN, xây dựng thành công CNXH và CNCS",
      "Duy trì vĩnh viễn chế độ tư hữu TBCN",
      "Giải tán toàn bộ lực lượng sản xuất",
      "Chỉ cải thiện điều kiện làm việc trong nhà máy"
    ],
    correctAnswer: 0,
    explanation: "Sứ mệnh lịch sử của giai cấp công nhân là lãnh đạo cách mạng xóa bỏ TBCN, giải phóng giai cấp và nhân loại, xây dựng thành công CNXH.",
    pageRef: "37"
  },
  {
    id: 15,
    level: 2,
    category: CHAPTER_NAMES[2],
    question: "Điều kiện khách quan quy định sứ mệnh lịch sử của giai cấp công nhân xuất phát từ:",
    options: [
      "Địa vị kinh tế - xã hội và đặc điểm chính trị - xã hội của giai cấp công nhân",
      "Lòng nhân ái cá nhân của các nhà tư tưởng",
      "Ý muốn chủ quan của các lãnh tụ",
      "Sự ngẫu nhiên của lịch sử"
    ],
    correctAnswer: 0,
    explanation: "Chính địa vị kinh tế - xã hội và đặc điểm chính trị - xã hội (tính tổ chức, kỷ luật, tiên phong) khách quan tạo nên sứ mệnh đó.",
    pageRef: "40"
  },
  {
    id: 16,
    level: 2,
    category: CHAPTER_NAMES[2],
    question: "Nhân tố chủ quan quan trọng nhất để giai cấp công nhân thực hiện thắng lợi sứ mệnh lịch sử của mình là gì?",
    options: [
      "Sự ra đời và lãnh đạo của Đảng Cộng sản - đội tiên phong của giai cấp công nhân",
      "Sự trợ giúp kinh tế từ các nước ngoài",
      "Số lượng công nhân tăng lên tự phát",
      "Tự động giải tán giai cấp tư sản"
    ],
    correctAnswer: 0,
    explanation: "Đảng Cộng sản là nhân tố chủ quan quyết định nhất, giữ vai trò hạt nhân lãnh đạo phong trào cách mạng của công nhân.",
    pageRef: "43"
  },
  {
    id: 17,
    level: 2,
    category: CHAPTER_NAMES[2],
    question: "Đặc điểm của giai cấp công nhân Việt Nam khi mới ra đời là gì?",
    options: [
      "Ra đời trước giai cấp tư sản Việt Nam, trưởng thành trong khai thác thuộc địa của thực dân Pháp",
      "Ra đời sau giai cấp tư sản Việt Nam hàng trăm năm",
      "Không có liên hệ với giai cấp nông dân",
      "Là giai cấp nắm quyền kinh tế lớn nhất"
    ],
    correctAnswer: 0,
    explanation: "Giai cấp công nhân Việt Nam ra đời đầu thế kỷ XX trong chính sách khai thác thuộc địa của Pháp, ra đời trước giai cấp tư sản dân tộc.",
    pageRef: "48"
  },
  {
    id: 18,
    level: 2,
    category: CHAPTER_NAMES[2],
    question: "Giai cấp công nhân Việt Nam có mối liên hệ tự nhiên và gắn bó chặt chẽ nhất với giai cấp nào?",
    options: [
      "Giai cấp nông dân",
      "Giai cấp tư sản",
      "Giai cấp địa chủ",
      "Tầng lớp quý tộc"
    ],
    correctAnswer: 0,
    explanation: "Đa số công nhân Việt Nam xuất thân từ nông dân, có mối quan hệ dòng máu, tình cảm và liên minh tự nhiên sâu sắc.",
    pageRef: "49"
  },
  {
    id: 19,
    level: 2,
    category: CHAPTER_NAMES[2],
    question: "Trong thời kỳ đổi mới và công nghiệp hóa - hiện đại hóa, giai cấp công nhân Việt Nam đóng vai trò gì?",
    options: [
      "Là giai cấp lãnh đạo cách mạng thông qua đội tiên phong là Đảng Cộng sản Việt Nam",
      "Chỉ là lực lượng lao động phụ trợ",
      "Không còn vai trò chính trị",
      "Chuyển giao vai trò lãnh đạo cho tư nhân"
    ],
    correctAnswer: 0,
    explanation: "Giai cấp công nhân Việt Nam tiếp tục là giai cấp lãnh đạo cách mạng thông qua ĐCSVN, đại diện cho phương thức sản xuất tiên tiến.",
    pageRef: "52"
  },
  {
    id: 20,
    level: 2,
    category: CHAPTER_NAMES[2],
    question: "Nội dung văn hóa - tư tưởng trong sứ mệnh lịch sử của giai cấp công nhân Việt Nam hiện nay là gì?",
    options: [
      "Xây dựng nền văn hóa Việt Nam tiên tiến, đậm đà bản sắc dân tộc, lấy chủ nghĩa Mác - Lênin làm nền tảng",
      "Bài trừ toàn bộ văn hóa truyền thống",
      "Nhập khẩu 100% lối sống phương Tây",
      "Cấm đoán các hoạt động nghệ thuật"
    ],
    correctAnswer: 0,
    explanation: "Nội dung văn hóa tư tưởng hướng tới xây dựng văn hóa tiên tiến, bản sắc, nâng cao tri thức và bản lĩnh chính trị cho người lao động.",
    pageRef: "55"
  },

  // --- CHƯƠNG 3 ---
  {
    id: 21,
    level: 3,
    category: CHAPTER_NAMES[3],
    question: "Theo lý luận Mác - Lênin, hình thái kinh tế - xã hội cộng sản chủ nghĩa phát triển qua những giai đoạn cơ bản nào?",
    options: [
      "Thời kỳ quá độ, Giai đoạn thấp (CNXH) và Giai đoạn cao (CNCS)",
      "Chế độ phong kiến và Chế độ tư bản",
      "Giai đoạn tiền công nghiệp và Giai đoạn hậu công nghiệp",
      "Giai đoạn tư sản và Giai đoạn dân chủ"
    ],
    correctAnswer: 0,
    explanation: "Hình thái kinh tế - xã hội CSCN phát triển từ thời kỳ quá độ, đến giai đoạn thấp (CNXH) và đạt tới giai đoạn cao (CNCS).",
    pageRef: "62"
  },
  {
    id: 22,
    level: 3,
    category: CHAPTER_NAMES[3],
    question: "Đặc trưng về mặt kinh tế của Chủ nghĩa xã hội là gì?",
    options: [
      "Dựa trên sở hữu công cộng (công hữu) về tư liệu sản xuất chủ yếu",
      "Dựa trên tư hữu tư bản chủ nghĩa hoàn toàn",
      "Kinh tế tự cung tự cấp lạc hậu",
      "Không có sự phân công lao động"
    ],
    correctAnswer: 0,
    explanation: "Bản chất kinh tế của CNXH là chế độ công hữu về các TLSX chủ yếu, phục vụ lợi ích chung của toàn xã hội.",
    pageRef: "66"
  },
  {
    id: 23,
    level: 3,
    category: CHAPTER_NAMES[3],
    question: "Nguyên tắc phân phối lợi ích kinh tế chủ đạo trong giai đoạn Chủ nghĩa xã hội là gì?",
    options: [
      "Phân phối theo lao động ('Làm theo năng lực, hưởng theo lao động')",
      "Phân phối theo nhu cầu ('Làm theo năng lực, hưởng theo nhu cầu')",
      "Phân phối bình quân cào bằng",
      "Phân phối dựa trên tài sản sở hữu"
    ],
    correctAnswer: 0,
    explanation: "Trong giai đoạn thấp (CNXH), phân phối theo lao động là nguyên tắc cơ bản nhất.",
    pageRef: "67"
  },
  {
    id: 24,
    level: 3,
    category: CHAPTER_NAMES[3],
    question: "Thời kỳ quá độ từ TBCN lên CNXH là tất yếu lịch sử vì lý do nào?",
    options: [
      "CNXH không thể tự phát sinh trong lòng TBCN, cần thời kỳ cải biến cách mạng toàn diện",
      "Giai cấp tư sản tự nguyện bàn giao chính quyền",
      "Mọi quốc gia đều có nền kinh tế giống hệt nhau",
      "Để kéo dài thời gian tồn tại của TBCN"
    ],
    correctAnswer: 0,
    explanation: "CNXH cần thời kỳ quá độ để xây dựng cơ sở vật chất - kỹ thuật, cải tạo quan hệ cũ và xác lập quan hệ sản xuất mới.",
    pageRef: "70"
  },
  {
    id: 25,
    level: 3,
    category: CHAPTER_NAMES[3],
    question: "Có mấy hình thức quá độ lên Chủ nghĩa xã hội?",
    options: [
      "2 hình thức: Quá độ trực tiếp và Quá độ gián tiếp",
      "1 hình thức duy nhất",
      "4 hình thức theo các châu lục",
      "Không có hình thức nào"
    ],
    correctAnswer: 0,
    explanation: "Quá độ trực tiếp (từ TBCN phát triển cao) và Quá độ gián tiếp (từ các nước chưa trải qua TBCN phát triển).",
    pageRef: "72"
  },
  {
    id: 26,
    level: 3,
    category: CHAPTER_NAMES[3],
    question: "Đặc điểm cơ bản nhất của thời kỳ quá độ lên chủ nghĩa xã hội là gì?",
    options: [
      "Sự tồn tại đan xen và đấu tranh giữa những nhân tố của xã hội mới và những tàn dư của xã hội cũ trên mọi lĩnh vực",
      "Sự thống trị tuyệt đối thuần khiết của CNXH",
      "Không còn giai cấp và mâu thuẫn xã hội",
      "Nền kinh tế hoàn toàn ngừng phát triển"
    ],
    correctAnswer: 0,
    explanation: "Thời kỳ quá độ là thời kỳ lịch sử có sự tồn tại đan xen giữa cái cũ và cái mới trên các lĩnh vực kinh tế, chính trị, tư tưởng.",
    pageRef: "74"
  },
  {
    id: 27,
    level: 3,
    category: CHAPTER_NAMES[3],
    question: "Việt Nam lựa chọn con đường quá độ lên CNXH theo hình thức nào?",
    options: [
      "Quá độ gián tiếp, bỏ qua chế độ tư bản chủ nghĩa",
      "Quá độ trực tiếp từ TBCN phát triển",
      "Quá độ qua chế độ phong kiến lâu dài",
      "Không theo thời kỳ quá độ"
    ],
    correctAnswer: 0,
    explanation: "Việt Nam đi lên CNXH theo con đường quá độ gián tiếp, bỏ qua việc xác lập vị trí thống trị của quan hệ sản xuất và kiến trúc thượng tầng TBCN.",
    pageRef: "78"
  },
  {
    id: 28,
    level: 3,
    category: CHAPTER_NAMES[3],
    question: "Cụm từ 'bỏ qua chế độ tư bản chủ nghĩa' ở Việt Nam được Đại hội IX của Đảng xác định là:",
    options: [
      "Bỏ qua việc xác lập vị trí thống trị của QHSX và KTTT tư bản chủ nghĩa, nhưng tiếp thu, kế thừa những thành tựu của nhân loại dưới TBCN",
      "Bỏ qua toàn bộ lực lượng sản xuất và kỹ thuật tiên tiến của TBCN",
      "Xóa bỏ hoàn toàn giao thương với thế giới tư sản",
      "Quay trở lại nền kinh tế tự nhiên"
    ],
    correctAnswer: 0,
    explanation: "Bỏ qua chế độ TBCN là bỏ qua sự thống trị của QHSX và KTTT TBCN, nhưng tiếp thu thành tựu khoa học, công nghệ, quản lý tiên tiến.",
    pageRef: "80"
  },
  {
    id: 29,
    level: 3,
    category: CHAPTER_NAMES[3],
    question: "Mô hình kinh tế tổng quát trong thời kỳ quá độ lên CNXH ở Việt Nam hiện nay là gì?",
    options: [
      "Kinh tế thị trường định hướng xã hội chủ nghĩa",
      "Kinh tế kế hoạch hóa tập trung bao cấp",
      "Kinh tế tư bản tự do hoàn toàn (Laissez-faire)",
      "Kinh tế tự nhiên tự cung tự cấp"
    ],
    correctAnswer: 0,
    explanation: "Việt Nam phát triển nền kinh tế thị trường định hướng XHCN nhằm giải phóng lực lượng sản xuất, xây dựng cơ sở kinh tế cho CNXH.",
    pageRef: "82"
  },
  {
    id: 30,
    level: 3,
    category: CHAPTER_NAMES[3],
    question: "Mục tiêu tổng quát của con đường đi lên CNXH ở Việt Nam là gì?",
    options: [
      "Dân giàu, nước mạnh, dân chủ, công bằng, văn minh",
      "Đạt thu nhập bình quân cao nhất châu Á ngay lập tức",
      "Trở thành đế quốc công nghiệp",
      "Xóa bỏ mọi đô thị"
    ],
    correctAnswer: 0,
    explanation: "Mục tiêu xuyên suốt được Đảng và Nhân dân Việt Nam phấn đấu là: 'Dân giàu, nước mạnh, dân chủ, công bằng, văn minh'.",
    pageRef: "85"
  },

  // --- CHƯƠNG 4 ---
  {
    id: 31,
    level: 4,
    category: CHAPTER_NAMES[4],
    question: "Thuật ngữ 'Dân chủ' (Demokratia) ra đời từ thời cổ đại có nghĩa nguyên thủy là gì?",
    options: [
      "Quyền lực thuộc về nhân dân (Nhân dân chủ)",
      "Quyền lực của tầng lớp vua chúa",
      "Sự cai trị của quân đội",
      "Sự thống trị của giới thượng lưu"
    ],
    correctAnswer: 0,
    explanation: "Demokratia được ghép từ Demos (nhân dân) và Kratos (quyền lực), nghĩa là quyền lực thuộc về nhân dân.",
    pageRef: "92"
  },
  {
    id: 32,
    level: 4,
    category: CHAPTER_NAMES[4],
    question: "Nền dân chủ xã hội chủ nghĩa chính thức được xác lập sau sự kiện lịch sử nào?",
    options: [
      "Cách mạng Tháng Mười Nga năm 1917",
      "Cách mạng Tư sản Pháp 1789",
      "Công xã Pa-ri 1871",
      "Chiến tranh thế giới thứ hai 1945"
    ],
    correctAnswer: 0,
    explanation: "Thắng lợi của Cách mạng Tháng Mười Nga 1917 và sự ra đời của Nhà nước Xô-viết đánh dấu nền dân chủ XHCN chính thức ra đời.",
    pageRef: "96"
  },
  {
    id: 33,
    level: 4,
    category: CHAPTER_NAMES[4],
    question: "Bản chất chính trị của nền dân chủ xã hội chủ nghĩa thể hiện ở chỗ nào?",
    options: [
      "Là sự lãnh đạo chính trị của giai cấp công nhân thông qua Đảng Cộng sản đối với toàn xã hội, bảo đảm quyền lực thuộc về nhân dân",
      "Là sự thống trị của giai cấp tư sản sản xuất",
      "Là sự phi chính trị hóa nhà nước",
      "Không có sự quản lý của Đảng chính trị"
    ],
    correctAnswer: 0,
    explanation: "Dân chủ XHCN mang bản chất giai cấp công nhân, phục vụ lợi ích của đa số nhân dân lao động.",
    pageRef: "98"
  },
  {
    id: 34,
    level: 4,
    category: CHAPTER_NAMES[4],
    question: "Bản chất kinh tế của nền dân chủ xã hội chủ nghĩa dựa trên:",
    options: [
      "Chế độ sở hữu công cộng về tư liệu sản xuất chủ yếu",
      "Chế độ sở hữu tư nhân TBCN",
      "Nền kinh tế đóng kín",
      "Sự độc quyền của tư nhân"
    ],
    correctAnswer: 0,
    explanation: "Dân chủ XHCN dựa trên chế độ công hữu TLSX chủ yếu, bảo đảm quyền làm chủ kinh tế của nhân dân.",
    pageRef: "99"
  },
  {
    id: 35,
    level: 4,
    category: CHAPTER_NAMES[4],
    question: "Nhà nước xã hội chủ nghĩa mang bản chất của giai cấp nào?",
    options: [
      "Giai cấp công nhân",
      "Giai cấp tư sản",
      "Giai cấp nông dân thuần túy",
      "Tầng lớp trí thức độc lập"
    ],
    correctAnswer: 0,
    explanation: "Nhà nước XHCN mang bản chất giai cấp công nhân, đồng thời tính nhân dân và tính dân tộc sâu sắc.",
    pageRef: "104"
  },
  {
    id: 36,
    level: 4,
    category: CHAPTER_NAMES[4],
    question: "Chức năng quan trọng nhất của Nhà nước xã hội chủ nghĩa là gì?",
    options: [
      "Tổ chức và xây dựng xã hội mới (CNXH và CNCS)",
      "Chuyên chính trấn áp thuần túy",
      "Mở rộng chiến tranh xâm lược",
      "Thu thuế cao tối đa"
    ],
    correctAnswer: 0,
    explanation: "Khác với các nhà nước bóc phốt, chức năng căn bản nhất của Nhà nước XHCN là tổ chức, xây dựng xã hội mới.",
    pageRef: "107"
  },
  {
    id: 37,
    level: 4,
    category: CHAPTER_NAMES[4],
    question: "Hình thức dân chủ trực tiếp ở Việt Nam được thực hiện thông qua:",
    options: [
      "Nhân dân tham gia biểu quyết khi trưng cầu ý dân, bầu cử đại biểu Quốc hội, HĐND, họp xóm thôn",
      "Ủy quyền toàn bộ cho cơ quan hành chính",
      "Nhờ đại diện nước ngoài quyết định",
      "Không thông qua các cuộc họp"
    ],
    correctAnswer: 0,
    explanation: "Dân chủ trực tiếp thể hiện qua bầu cử trực tiếp, trưng cầu ý dân, bàn và quyết định công việc ở cơ sở.",
    pageRef: "112"
  },
  {
    id: 38,
    level: 4,
    category: CHAPTER_NAMES[4],
    question: "Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam có đặc điểm cơ bản nào?",
    options: [
      "Nhà nước của nhân dân, do nhân dân, vì nhân dân, do Đảng Cộng sản Việt Nam lãnh đạo",
      "Thực hiện phân chia 3 quyền lập pháp, hành pháp, tư pháp hoàn toàn đối lập tách rời",
      "Không đặt pháp luật lên trên hết",
      "Do giai cấp tư sản điều hành"
    ],
    correctAnswer: 0,
    explanation: "Nhà nước pháp quyền XHCN Việt Nam là Nhà nước của dân, do dân, vì dân, quản lý xã hội bằng pháp luật dưới sự lãnh đạo của Đảng.",
    pageRef: "115"
  },
  {
    id: 39,
    level: 4,
    category: CHAPTER_NAMES[4],
    question: "Quyền lực nhà nước Việt Nam được tổ chức theo nguyên tắc nào?",
    options: [
      "Quyền lực nhà nước là thống nhất, có sự phân công, phối hợp và kiểm soát giữa các cơ quan trong việc thực hiện quyền lập pháp, hành pháp, tư pháp",
      "Tam quyền phân lập tuyệt đối",
      "Tập trung tuyệt đối vào cá nhân người đứng đầu",
      "Phân chia quyền lực cho các tỉnh tự quản độc lập"
    ],
    correctAnswer: 0,
    explanation: "Hiến pháp Việt Nam khẳng định quyền lực nhà nước là thống nhất, có sự phân công, phối hợp, kiểm soát giữa lập pháp, hành pháp và tư pháp.",
    pageRef: "117"
  },
  {
    id: 40,
    level: 4,
    category: CHAPTER_NAMES[4],
    question: "Trọng tâm cải cách bộ máy Nhà nước pháp quyền XHCN Việt Nam hiện nay là gì?",
    options: [
      "Xây dựng nền hành chính chuyên nghiệp, tinh gọn, hiệu lực, hiệu quả, đẩy mạnh phòng chống tham nhũng, tiêu cực",
      "Tăng số lượng cán bộ hành chính lên gấp đôi",
      "Xóa bỏ hệ thống Tòa án",
      "Giảm bớt vai trò lãnh đạo của Đảng"
    ],
    correctAnswer: 0,
    explanation: "Trọng tâm là tinh gọn bộ máy, nâng cao hiệu lực hiệu quả, phòng chống tham nhũng lãng phí, phục vụ nhân dân.",
    pageRef: "122"
  },

  // --- CHƯƠNG 5 ---
  {
    id: 41,
    level: 5,
    category: CHAPTER_NAMES[5],
    question: "Cơ cấu xã hội - giai cấp là gì?",
    options: [
      "Hệ thống các giai cấp, tầng lớp xã hội tồn tại khách quan và mối quan hệ giữa chúng về sở hữu, địa vị, vai trò trong một hệ thống sản xuất nhất định",
      "Tập hợp ngẫu nhiên các cá nhân trong đô thị",
      "Sự phân chia dân số theo độ tuổi",
      "Sự phân chia theo giới tính"
    ],
    correctAnswer: 0,
    explanation: "Cơ cấu xã hội - giai cấp là hệ thống các giai cấp, tầng lớp và mối quan hệ giữa chúng trong nền sản xuất xã hội.",
    pageRef: "128"
  },
  {
    id: 42,
    level: 5,
    category: CHAPTER_NAMES[5],
    question: "Vị trí của cơ cấu xã hội - giai cấp trong hệ thống cơ cấu xã hội là gì?",
    options: [
      "Giữ vị trí trung tâm, quyết định các loại hình cơ cấu xã hội khác (dân tộc, dân số, nghề nghiệp...)",
      "Không có vai trò gì quan trọng",
      "Phụ thuộc hoàn toàn vào cơ cấu dân số",
      "Đứng sau cơ cấu tôn giáo"
    ],
    correctAnswer: 0,
    explanation: "Cơ cấu xã hội - giai cấp liên quan trực tiếp đến sở hữu tư liệu sản xuất và quyền lực chính trị nên giữ vị trí trung tâm.",
    pageRef: "130"
  },
  {
    id: 43,
    level: 5,
    category: CHAPTER_NAMES[5],
    question: "Yếu tố nào quy định sự biến đổi phức tạp, đa dạng của cơ cấu xã hội - giai cấp trong thời kỳ quá độ?",
    options: [
      "Sự tồn tại của nền kinh tế nhiều thành phần",
      "Sự thay đổi thời tiết khí hậu",
      "Ý muốn tự do của cư dân",
      "Sự gia tăng biến động dân số tự nhiên"
    ],
    correctAnswer: 0,
    explanation: "Cơ sở kinh tế nhiều thành phần quy định sự tồn tại của nhiều giai cấp, tầng lớp xã hội đan xen phức tạp.",
    pageRef: "134"
  },
  {
    id: 44,
    level: 5,
    category: CHAPTER_NAMES[5],
    question: "Liên minh giữa giai cấp công nhân với giai cấp nông dân và tầng lớp trí thức là:",
    options: [
      "Nguyên tắc chiến lược có tính quy luật để bảo đảm thắng lợi của cách mạng XHCN",
      "Tổ chức liên minh tạm thời mang tính thủ thuật chính trị",
      "Mối quan hệ tự phát không cần định hướng",
      "Sự gượng ép từ một phía"
    ],
    correctAnswer: 0,
    explanation: "V.I.Lênin khẳng định liên minh công - nông - trí thức là nguyên tắc chiến lược cao nhất của chuyên chính mỹ nhân lao động.",
    pageRef: "138"
  },
  {
    id: 45,
    level: 5,
    category: CHAPTER_NAMES[5],
    question: "Nội dung quan trọng nhất, giữ vai trò quyết định trong khối liên minh công - nông - trí thức là gì?",
    options: [
      "Nội dung kinh tế (hợp tác phát triển sản xuất, kết nối thị trường, nâng cao đời sống)",
      "Nội dung giao lưu văn hóa nghệ thuật",
      "Nội dung thể dục thể thao",
      "Nội dung trợ cấp từ thiện"
    ],
    correctAnswer: 0,
    explanation: "Liên minh về kinh tế là cơ sở vững chắc nhất, thỏa mãn lợi ích thiết thân của các giai tầng.",
    pageRef: "142"
  },
  {
    id: 46,
    level: 5,
    category: CHAPTER_NAMES[5],
    question: "Trong thời kỳ quá độ ở Việt Nam, cơ cấu xã hội - giai cấp bao gồm những lực lượng cơ bản nào?",
    options: [
      "Giai cấp công nhân, giai cấp nông dân, đội ngũ trí thức, đội ngũ doanh nhân, thanh niên, phụ nữ...",
      "Chỉ có công nhân và tư sản",
      "Chỉ có nông dân và địa chủ",
      "Hoàn toàn không có phân hóa tầng lớp"
    ],
    correctAnswer: 0,
    explanation: "Việt Nam có cơ cấu giai tầng đa dạng: Công nhân, nông dân, trí thức, doanh nhân... cùng hợp tác trong khối đại đoàn kết.",
    pageRef: "146"
  },
  {
    id: 47,
    level: 5,
    category: CHAPTER_NAMES[5],
    question: "Đội ngũ trí thức Việt Nam có vai trò đặc biệt gì trong thời kỳ đẩy mạnh công nghiệp hóa, hiện đại hóa?",
    options: [
      "Là lực lượng lao động sáng tạo đặc biệt quan trọng trong phát triển kinh tế tri thức và đổi mới sáng tạo",
      "Là giai cấp độc lập nắm quyền chính trị",
      "Chỉ làm công việc giảng dạy lý thuyết",
      "Không có đóng góp cho sản xuất"
    ],
    correctAnswer: 0,
    explanation: "Trí thức là nguồn lực tri thức cốt lõi thúc đẩy kinh tế tri thức, khoa học công nghệ và đổi mới sáng tạo.",
    pageRef: "150"
  },
  {
    id: 48,
    level: 5,
    category: CHAPTER_NAMES[5],
    question: "Đội ngũ doanh nhân ở Việt Nam hiện nay được nhìn nhận như thế nào?",
    options: [
      "Là lực lượng nòng cốt trong phát triển kinh tế, tạo việc làm và giàu mạnh cho đất nước",
      "Là đối tượng cần loại bỏ",
      "Là tầng lớp bóc phốt bị cấm đoán",
      "Không có vai trò kinh tế"
    ],
    correctAnswer: 0,
    explanation: "Đảng và Nhà nước tôn vinh đội ngũ doanh nhân là lực lượng nòng cốt phát triển kinh tế hội nhập.",
    pageRef: "152"
  },
  {
    id: 49,
    level: 5,
    category: CHAPTER_NAMES[5],
    question: "Xu hướng biến đổi chủ đạo của cơ cấu xã hội - giai cấp ở Việt Nam trong thời kỳ quá độ là gì?",
    options: [
      "Xích lại gần nhau về địa vị kinh tế - xã hội, tăng cường sự xích lại giữa các giai tầng trong khối đại đoàn kết dân tộc",
      "Phân hóa giàu nghèo ngày càng sâu sắc không thể cứu chữa",
      "Tăng cường mâu thuẫn đối kháng giai cấp",
      "Tách biệt hoàn toàn các vùng miền"
    ],
    correctAnswer: 0,
    explanation: "Xu hướng chủ đạo là sự xích lại gần nhau giữa các giai tầng nhờ chính sách phát triển kinh tế - xã hội hướng tới công bằng.",
    pageRef: "156"
  },
  {
    id: 50,
    level: 5,
    category: CHAPTER_NAMES[5],
    question: "Phương hướng cơ bản để tăng cường khối liên minh giai cấp, tầng lớp ở Việt Nam hiện nay là:",
    options: [
      "Hoàn thiện thể chế kinh tế thị trường định hướng XHCN, bảo đảm hài hòa lợi ích giữa các giai tầng",
      "Ưu tiên tuyệt đối lợi ích của tư nhân nước ngoài",
      "Bắt buộc mọi người làm chung một nghề",
      "Triệt hạ các tầng lớp doanh nghiệp nhỏ"
    ],
    correctAnswer: 0,
    explanation: "Xây dựng thể chế kinh tế hài hòa lợi ích, phát triển giáo dục, đào tạo nghề và bảo đảm an sinh xã hội.",
    pageRef: "160"
  },

  // --- CHƯƠNG 6 ---
  {
    id: 51,
    level: 6,
    category: CHAPTER_NAMES[6],
    question: "Theo quan điểm Mác - Lênin, Dân tộc (Nation) là hình thức cộng đồng người phát triển cao nhất, có các đặc trưng cơ bản nào?",
    options: [
      "Có chung lãnh thổ, phương thức sinh hoạt kinh tế, ngôn ngữ giao tiếp, văn hóa và tâm lý dân tộc, sự quản lý của nhà nước",
      "Chỉ cần chung huyết thống gia đình",
      "Chỉ cần chung một tôn giáo tín ngưỡng",
      "Chỉ là tập hợp cư dân sinh sống ngẫu nhiên"
    ],
    correctAnswer: 0,
    explanation: "Dân tộc (nghĩa quốc gia) có 5 đặc trưng: lãnh thổ, kinh tế, ngôn ngữ, văn hóa/tâm lý và nhà nước quản lý.",
    pageRef: "166"
  },
  {
    id: 52,
    level: 6,
    category: CHAPTER_NAMES[6],
    question: "Hai xu hướng khách quan của sự phát triển các dân tộc trong thời đại hiện nay là gì?",
    options: [
      "Xu hướng tách ra để thành lập các quốc gia dân tộc độc lập và xu hướng liên hiệp lại giữa các dân tộc",
      "Xu hướng đồng hóa cưỡng bức và xóa bỏ tiếng nói",
      "Xu hướng cô lập hoàn toàn và xung đột vũ trang",
      "Xu hướng bỏ qua biên giới lãnh thổ thuần túy"
    ],
    correctAnswer: 0,
    explanation: "V.I.Lênin phát hiện 2 xu hướng: 1) Tách ra thành quốc gia độc lập; 2) Liên hiệp các dân tộc lại do nhu cầu giao thương, công nghệ.",
    pageRef: "170"
  },
  {
    id: 53,
    level: 6,
    category: CHAPTER_NAMES[6],
    question: "Cương lĩnh dân tộc của C.Mác - V.I.Lênin bao gồm các nội dung cơ bản nào?",
    options: [
      "Các dân tộc hoàn toàn bình đẳng, các dân tộc được quyền tự quyết, liên hiệp công nhân tất cả các dân tộc",
      "Ưu tiên dân tộc lớn cai trị dân tộc nhỏ",
      "Cấm các dân tộc thi hành quyền tự quyết",
      "Tách biệt công nhân các nước"
    ],
    correctAnswer: 0,
    explanation: "Ba nội dung cốt lõi: 1. Các dân tộc hoàn toàn bình đẳng; 2. Các dân tộc được quyền tự quyết; 3. Liên hiệp công nhân tất cả các dân tộc.",
    pageRef: "174"
  },
  {
    id: 54,
    level: 6,
    category: CHAPTER_NAMES[6],
    question: "Việt Nam là một quốc gia đa dân tộc với đặc điểm nổi bật nào?",
    options: [
      "Có 54 dân tộc anh em, cùng chung sống đoàn kết, quy mô dân số không đều, địa bàn cư trú xen kẽ là chủ yếu",
      "Có xung đột sắc tộc gay gắt từ cổ đại",
      "Các dân tộc sống hoàn toàn biệt lập theo từng tỉnh",
      "Chỉ có 2 dân tộc chính"
    ],
    correctAnswer: 0,
    explanation: "Việt Nam có 54 dân tộc, Kinh chiếm đa số, cư trú xen kẽ, truyền thống đoàn kết chống ngoại xâm và thiên tai.",
    pageRef: "178"
  },
  {
    id: 55,
    level: 6,
    category: CHAPTER_NAMES[6],
    question: "Quan điểm chỉ đạo của Đảng ta về chính sách dân tộc là:",
    options: [
      "Bình đẳng, đoàn kết, tôn trọng, giúp nhau cùng phát triển",
      "Đồng hóa các dân tộc thiểu số",
      "Phân biệt đối xử theo số lượng dân số",
      "Để các dân tộc tự túc phát triển"
    ],
    correctAnswer: 0,
    explanation: "Nguyên tắc nhất quán: 'Các dân tộc bình đẳng, đoàn kết, tôn trọng và giúp nhau cùng phát triển'.",
    pageRef: "182"
  },
  {
    id: 56,
    level: 6,
    category: CHAPTER_NAMES[6],
    question: "Tôn giáo là một hình thái ý thức xã hội phản ánh hiện thực khách quan một cách:",
    options: [
      "Hư ảo, hoang đường vào đầu óc con người thông qua các lực lượng siêu nhiên",
      "Chính xác khoa học tuyệt đối",
      "Logic toán học thuần túy",
      "Không có liên hệ với đời sống con người"
    ],
    correctAnswer: 0,
    explanation: "Bản chất tôn giáo là sự phản ánh hư ảo thế giới khách quan vào đầu óc con người thông qua niềm tin siêu nhiên.",
    pageRef: "186"
  },
  {
    id: 57,
    level: 6,
    category: CHAPTER_NAMES[6],
    question: "Nguồn gốc xã hội của tôn giáo bao gồm những yếu tố nào?",
    options: [
      "Sự bế tắc của con người trước áp bức giai cấp và sự bất lực trước lực lượng thiên nhiên tàn phá",
      "Sự phát triển cao của trí tuệ nhân tạo",
      "Sự dư thừa về vật chất",
      "Lòng tham muốn thống trị vũ trụ"
    ],
    correctAnswer: 0,
    explanation: "Sự bất lực trước lực lượng thiên nhiên và sự bế tắc trước áp bức bất công xã hội tạo nên nguồn gốc xã hội tôn giáo.",
    pageRef: "189"
  },
  {
    id: 58,
    level: 6,
    category: CHAPTER_NAMES[6],
    question: "Nguyên tắc giải quyết vấn đề tôn giáo trong thời kỳ quá độ lên CNXH bao gồm:",
    options: [
      "Tôn trọng, bảo đảm quyền tự do tín ngưỡng và không tín ngưỡng; phân biệt mặt tư tưởng và mặt chính trị; nghiêm cấm lợi dụng tôn giáo",
      "Cấm đoán triệt để mọi sinh hoạt tôn giáo",
      "Bắt buộc mọi người phải theo một tôn giáo duy nhất",
      "Coi tín đồ tôn giáo là kẻ thù"
    ],
    correctAnswer: 0,
    explanation: "Tôn trọng tự do tín ngưỡng/không tín ngưỡng, phân biệt chính trị và tư tưởng, đoàn kết đồng bào có đạo và không đạo.",
    pageRef: "194"
  },
  {
    id: 59,
    level: 6,
    category: CHAPTER_NAMES[6],
    question: "Đặc điểm tôn giáo ở Việt Nam hiện nay là gì?",
    options: [
      "Là quốc gia đa tôn giáo, các tôn giáo sống hòa hợp, không có xung đột chiến tranh tôn giáo lớn trong lịch sử",
      "Chỉ có 1 tôn giáo duy nhất được phép tồn tại",
      "Có sự tranh chấp lãnh thổ giữa các giáo hội",
      "Không có tín đồ tôn giáo nào"
    ],
    correctAnswer: 0,
    explanation: "Việt Nam có nhiều tôn giáo (Phật giáo, Công giáo, Tin lành, Cao Đài, Hòa Hảo...) cùng đồng hành với dân tộc.",
    pageRef: "198"
  },
  {
    id: 60,
    level: 6,
    category: CHAPTER_NAMES[6],
    question: "Nhiệm vụ cốt lõi trong công tác tôn giáo ở Việt Nam hiện nay là:",
    options: [
      "Vận động, đoàn kết quần chúng tín đồ và chức sắc tôn giáo trong khối đại đoàn kết toàn dân tộc 'Tốt đời, đẹp đạo'",
      "Đóng cửa các cơ sở thờ tự",
      "Cấm truyền đạo hoàn toàn",
      "Buộc các tín đồ từ bỏ giáo lý"
    ],
    correctAnswer: 0,
    explanation: "Cốt lõi công tác tôn giáo là vận động quần chúng, phát huy giá trị đạo đức tốt đẹp, củng cố đại đoàn kết dân tộc.",
    pageRef: "202"
  },

  // --- CHƯƠNG 7 ---
  {
    id: 61,
    level: 7,
    category: CHAPTER_NAMES[7],
    question: "Gia đình là một hình thức cộng đồng xã hội đặc biệt, được hình thành và gắn kết với nhau dựa trên hai mối quan hệ cơ bản nào?",
    options: [
      "Quan hệ hôn nhân (vợ chồng) và Quan hệ huyết thống (cha mẹ, con cái)",
      "Quan hệ đồng nghiệp và Quan hệ bạn bè",
      "Quan hệ chủ thợ và Quan hệ đối tác",
      "Quan hệ xóm giềng và Quan hệ hội đoàn"
    ],
    correctAnswer: 0,
    explanation: "Gia đình hình thành từ quan hệ hôn nhân và huyết thống (cùng quan hệ nuôi dưỡng, gắn bó kinh tế).",
    pageRef: "208"
  },
  {
    id: 62,
    level: 7,
    category: CHAPTER_NAMES[7],
    question: "Chức năng tự nhiên và sinh học quan trọng nhất của gia đình là gì?",
    options: [
      "Chức năng tái sản xuất ra con người (sinh sản duy trì nòi giống)",
      "Chức năng quản lý kinh tế quốc gia",
      "Chức năng sản xuất hàng hóa công nghiệp",
      "Chức năng an ninh quốc phòng"
    ],
    correctAnswer: 0,
    explanation: "Tái sản xuất ra con người là chức năng đặc thù đáp ứng nhu cầu duy trì nòi giống và cung cấp sức lao động cho xã hội.",
    pageRef: "212"
  },
  {
    id: 63,
    level: 7,
    category: CHAPTER_NAMES[7],
    question: "Chức năng nuôi dưỡng, giáo dục của gia đình có vai trò như thế nào đối với sự phát triển cá nhân?",
    options: [
      "Là môi trường giáo dục đầu tiên và suốt đời, hình thành nhân cách đạo đức cơ bản của con người",
      "Không có ảnh hưởng tới nhân cách",
      "Có thể thay thế hoàn toàn bởi nhà trường",
      "Chỉ có tác dụng trong 3 năm đầu đời"
    ],
    correctAnswer: 0,
    explanation: "Giáo dục gia đình là nền tảng đầu tiên và đi theo suốt cuộc đời mỗi con người.",
    pageRef: "215"
  },
  {
    id: 64,
    level: 7,
    category: CHAPTER_NAMES[7],
    question: "Cơ sở kinh tế - xã hội cốt lõi để xây dựng gia đình trong thời kỳ quá độ lên CNXH là gì?",
    options: [
      "Sự phát triển của lực lượng sản xuất và việc xác lập chế độ công hữu về tư liệu sản xuất chủ yếu",
      "Chế độ tư hữu bất động sản độc quyền",
      "Sự gia tăng thu nhập của riêng người nam giới",
      "Sự xóa bỏ hoàn toàn giao thương thị trường"
    ],
    correctAnswer: 0,
    explanation: "Chế độ công hữu TLSX xóa bỏ cơ sở kinh tế của sự áp bức trong gia đình tư sản, tạo sự bình đẳng thực sự.",
    pageRef: "220"
  },
  {
    id: 65,
    level: 7,
    category: CHAPTER_NAMES[7],
    question: "Cơ sở chính trị - xã hội để bảo vệ quyền lợi của gia đình là gì?",
    options: [
      "Sự thiết lập Nhà nước xã hội chủ nghĩa và hệ thống pháp luật (Luật Hôn nhân và Gia đình)",
      "Quy định riêng của từng dòng họ",
      "Luật lệ của các băng nhóm",
      "Ý muốn cá nhân của người làm chủ hộ"
    ],
    correctAnswer: 0,
    explanation: "Nhà nước XHCN ban hành các luật và chính sách an sinh xã hội để bảo vệ quyền bình đẳng và hạnh phúc gia đình.",
    pageRef: "224"
  },
  {
    id: 66,
    level: 7,
    category: CHAPTER_NAMES[7],
    question: "Chế độ hôn nhân tiến bộ trong Chủ nghĩa xã hội dựa trên các nguyên tắc cơ bản nào?",
    options: [
      "Hôn nhân tự nguyện, tiến bộ, một vợ một chồng, vợ chồng bình đẳng, được pháp luật bảo vệ",
      "Hôn nhân ép buộc do cha mẹ đặt đâu ngồi đấy",
      "Hôn nhân đa thê nam quyền",
      "Hôn nhân thương mại coi con người là hàng hóa"
    ],
    correctAnswer: 0,
    explanation: "Hôn nhân tiến bộ dựa trên tình yêu chân chính, tự nguyện, 1 vợ 1 chồng, bình đẳng nam nữ.",
    pageRef: "228"
  },
  {
    id: 67,
    level: 7,
    category: CHAPTER_NAMES[7],
    question: "Biến đổi của gia đình Việt Nam hiện nay về quy mô gia đình có xu hướng gì?",
    options: [
      "Quy mô gia đình ngày càng thu nhỏ (từ gia đình truyền thống đa thế hệ sang gia đình hạt nhân 2 thế hệ)",
      "Quy mô gia đình mở rộng lên 5-6 thế hệ cùng sống chung",
      "Không có sự thay đổi quy mô",
      "Xóa bỏ hoàn toàn mô hình gia đình"
    ],
    correctAnswer: 0,
    explanation: "Xu hướng chuyển từ gia đình lớn đa thế hệ sang gia đình hạt nhân (vợ chồng và con cái) linh hoạt và độc lập.",
    pageRef: "235"
  },
  {
    id: 68,
    level: 7,
    category: CHAPTER_NAMES[7],
    question: "Sự biến đổi trong quan hệ giữa các thế hệ trong gia đình Việt Nam hiện nay đòi hỏi điều gì?",
    options: [
      "Kế thừa các giá trị hiếu thảo, kính trên nhường dưới truyền thống đồng thời tôn trọng quyền tự do cá nhân tiến bộ",
      "Xóa bỏ hoàn toàn nghĩa vụ hiếu thảo với cha mẹ",
      "Áp đặt quyền uy tuyệt đối của người già",
      "Trẻ em không cần nghe lời người lớn"
    ],
    correctAnswer: 0,
    explanation: "Cần kết hợp hài hòa giữa truyền thống tôn sư trọng đạo, hiếu thảo với tinh thần dân chủ, tôn trọng cá nhân hiện đại.",
    pageRef: "242"
  },
  {
    id: 69,
    level: 7,
    category: CHAPTER_NAMES[7],
    question: "Vấn đề thách thức lớn đối với gia đình Việt Nam hiện nay trong nền kinh tế thị trường hội nhập là gì?",
    options: [
      "Nguy cơ rạn nứt tình cảm do áp lực công việc, suy giáp đạo đức, bạo lực gia đình và ly hôn có chiều hướng gia tăng",
      "Có quá nhiều thời gian rảnh rỗi bên nhau",
      "Không có sản phẩm tiêu dùng",
      "Sự can thiệp quá sâu của chính quyền vào sinh hoạt gia đình"
    ],
    correctAnswer: 0,
    explanation: "Mặt trái kinh tế thị trường tạo áp lực sống, làm phát sinh nguy cơ ly hôn, bạo lực gia đình và phai nhạt tình cảm.",
    pageRef: "248"
  },
  {
    id: 70,
    level: 7,
    category: CHAPTER_NAMES[7],
    question: "Một phương hướng cơ bản xây dựng và phát triển gia đình Việt Nam trong thời kỳ quá độ là gì?",
    options: [
      "Tăng cường sự lãnh đạo của Đảng, nâng cao nhận thức xã hội và gắn xây dựng gia đình với phát triển kinh tế - xã hội",
      "Xem xây dựng gia đình là việc riêng, không liên quan chính sách xã hội",
      "Giảm vai trò của pháp luật và giáo dục gia đình",
      "Không cần hỗ trợ các gia đình khó khăn"
    ],
    correctAnswer: 0,
    explanation: "Xây dựng gia đình là nội dung chiến lược trong phát triển kinh tế - xã hội, hoàn thiện chính sách an sinh và gia đình hạnh phúc.",
    pageRef: "260, 261, 262, 263"
  }
];
