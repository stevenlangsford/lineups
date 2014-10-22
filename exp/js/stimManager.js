//Line up is position in array (+1), individual photos in order,File 1,File 2,File 3,File 4,File 5,File 6,
var lineups = [
["f_wt_yg_lg_bl_bn_ngl.jpg","f_wt_yg_lg_bl_bn_ngl2.jpg","f_wt_yg_lg_bl_bn_ngl3.jpg","f_wt_yg_lg_bl_bn_ngl4.jpg","f_wt_yg_lg_bl_bn_ngl6.jpg","f_wt_yg_lg_bl_bn_ngl9.jpg"],
["f_wt_yg_st_rd_bn_ngl.jpg","f_wt_yg_st_rd_bu_ngl.jpg","f_wt_yg_st_rd_bu_ngl2.jpg","F_wt_yg_st_rd_gn_ngl.jpg","F_wt_yg_st_rd_gn_ngl2.jpg","f_wt_yg_st_rd_gn_ngl3.jpg"],
["f_wt_yg_lg_bl_bn_ngl14.jpg","F_wt_yg_lg_bl_bn_ngl8.jpg","f_wt_yg_lg_bl_bn_ngl11.jpg","f_wt_yg_lg_bl_bn_ngl12.jpg","f_wt_yg_lg_bl_bn_ngl13.jpg","f_wt_yg_lg_bl_bn_ngl15.jpg"],
["F_wt_yg_lg_bl_bu_ngl.jpg","F_wt_yg_lg_bl_bu_ngl10.jpg","F_wt_yg_lg_bl_bu_ngl3.jpg","F_wt_yg_lg_bl_bu_ngl5.jpg","F_wt_yg_lg_bl_bu_ngl6.jpg","F_wt_yg_lg_bl_bu_ngl7.jpg"],
["F_wt_yg_lg_bl_bu_ngl12.jpg","f_wt_yg_lg_bl_bu_ngl34.jpg","f_wt_yg_lg_bl_bu_ngl33.jpg","f_wt_yg_lg_bl_bu_ngl27.jpg","f_wt_yg_lg_bl_bu_ngl22.jpg","f_wt_yg_lg_bl_gn_ngl4.jpg"],
["F_wt_yg_lg_bl_bu_ngl14.jpg","f_wt_yg_lg_bl_bu_ngl25.jpg","f_wt_yg_lg_bl_bu_ngl31.jpg","f_wt_yg_lg_bl_bu_ngl28.jpg","F_wt_yg_lg_bl_bu_ngl13.jpg","F_wt_yg_lg_bl_bu_ngl19.jpg"],
["F_wt_yg_lg_bl_bu_ngl2.jpg","f_wt_yg_lg_bl_bu_ngl18.jpg","f_wt_yg_lg_bl_bu_ngl30.jpg","f_wt_yg_lg_bl_bu_ngl29.jpg","f_wt_yg_lg_bl_bu_ngl26.jpg","f_wt_yg_lg_bl_bu_ngl23.jpg"],
["f_wt_yg_lg_bl_hz_ngl6.jpg","f_wt_yg_lg_bl_hz_ngl7.jpg","f_wt_yg_lg_bl_hz_ngl8.jpg","f_wt_yg_lg_bl_gn_ngl2.jpg","F_wt_yg_lg_bl_hz_ngl.jpg","f_wt_yg_lg_bl_gn_ngl3.jpg"],
["F_wt_yg_md_bl_bu_ngl10.jpg","F_wt_yg_md_bl_bu_ngl13.jpg","F_wt_yg_md_bl_bu_ngl14.jpg","f_wt_yg_md_bl_bu_ngl17.jpg","F_wt_yg_md_bl_bu_ngl22.jpg","F_wt_yg_md_bl_bu_ngl9.jpg"],
["f_wt_yg_md_bl_bu_ngl18.jpg","f_wt_yg_md_bl_bu_ngl26.jpg","f_wt_yg_md_bl_bu_ngl36.jpg","f_wt_yg_md_bl_hz_ngl2.jpg","F_wt_yg_md_bl_bu_ngl11.jpg","F_wt_yg_md_bl_bu_ngl.jpg"],
["F_wt_yg_md_bl_bn_ngl.jpg","f_wt_yg_md_bl_bn_ngl8.jpg","F_wt_yg_md_bl_bn_ngl9.jpg","F_wt_yg_md_bl_bn_ngl7.jpg","F_wt_yg_md_bl_bn_ngl5.jpg","f_wt_yg_md_bl_bn_ngl10.jpg"],
["M_hs_yg_st_br_bn_gl_ms.jpg","M_hs_yg_st_br_bn_ngl_sh.jpg","M_wt_yg_md_br_bn_ngl_sh4.jpg","M_wt_yg_md_br_bu_gl_sh.jpg","M_wt_yg_st_bk_hz_ngl_sh.jpg","M_wt_yg_st_br_bu_ngl_gt.jpg"],
["m_wt_yg_st_br_bu_ngl_sd4.jpg","M_wt_yg_st_br_bu_ngl_sh10.jpg","m_wt_yg_st_br_bn_ngl_sh25.jpg","m_wt_yg_st_br_bu_ngl_gt2.jpg","M_wt_yg_st_br_bn_ngl_sd.jpg","M_wt_yg_st_br_bu_ngl_sd3.jpg"],
["M_wt_yg_md_bl_bn_ngl_sh.jpg","m_wt_yg_md_bl_bu_ngl_sh7.jpg","M_wt_yg_md_bl_bu_ngl_sh8.jpg","M_wt_yg_md_bl_bu_ngl_sh11.jpg.jpg","m_wt_yg_md_bl_bu_ngl_sh12.jpg.jpg","M_wt_yg_md_bl_hz_ngl_sh.jpg.jpg"],
["M_wt_yg_st_br_bu_ngl_sh6.jpg","m_wt_yg_st_br_bu_ngl_sh20.jpg","M_wt_yg_st_br_hz_ngl_sh.jpg","M_wt_yg_st_br_hz_ngl_sh3.jpg","M_wt_yg_st_br_hz_ngl_sh7.jpg","M_wt_yg_st_br_bn_ngl_sh7.jpg"],
["M_wt_yg_st_br_bn_gl_sh.jpg","M_wt_yg_st_br_bn_gl_sh2.jpg","m_wt_yg_st_br_bn_gl_sh3.jpg","M_wt_yg_st_br_bu_gl_sh.jpg","m_wt_yg_st_br_bu_gl_sh2.jpg","M_wt_yg_md_br_bn_gl_sh.jpg"],
["M_wt_yg_md_bl_gn_ngl_sh.jpg","M_wt_yg_md_bl_bu_ngl_gt.jpg","M_wt_md_bl_bu_ngl_sh.jpg","M_wt_yg_md_bl_bu_ngl_sh9.jpg","m_wt_yg_md_bl_bu_ngl_sh10.jpg","m_wt_yg_st_bl_hz_ngl_sh3.jpg"],
["m_wt_yg_st_bk_bu_ngl_sh.jpg","m_wt_yg_st_bk_bn_ngl_sh12.jpg","m_wt_yg_st_bk_bn_ngl_sh13.jpg","m_wt_yg_st_br_bn_ngl_sh34.jpg","m_wt_yg_st_br_bn_ngl_sh21.jpg","M_wt_yg_st_br_bn_ngl_sd2.jpg"],
["F_wt_yg_lg_br_bn_ngl3.jpg","F_wt_yg_lg_br_bn_ngl4.jpg","F_wt_yg_lg_br_bn_ngl8.jpg","f_wt_yg_lg_br_bn_ngl16.jpg","F_wt_yg_lg_br_bn_ngl9.jpg","F_wt_yg_lg_br_gn_ngl.jpg"],
["F_wt_yg_lg_br_bu_ngl5.jpg","F_wt_yg_lg_br_bu_ngl4.jpg","F_wt_yg_lg_br_bu_ngl8.jpg","f_wt_yg_lg_br_bu_ngl17.jpg","f_wt_yg_lg_br_bu_ngl15.jpg","f_wt_yg_lg_br_bn_ngl17.jpg"],
["F_wt_yg_md_bl_bu_ngl15.jpg","f_wt_yg_md_bl_bu_ngl16.jpg","F_wt_yg_md_bl_bu_ngl25.jpg","f_wt_yg_lg_bl_bn_ngl10.jpg","F_wt_yg_lg_br_hz_ngl.jpg","F_wt_yg_lg_br_bu_ngl2.jpg"],
["F_wt_yg_md_br_bn_ngl11.jpg","F_wt_yg_md_br_bn_ngl22.jpg","F_wt_yg_md_br_bn_ngl13.jpg","F_wt_yg_st_br_bn_ngl2.jpg","F_wt_yg_st_br_bn_ngl3.jpg","f_wt_yg_st_br_bn_ngl8.jpg"],
["F_wt_yg_lg_br_bu_ngl7.jpg","f_wt_yg_lg_br_bn_ngl13.jpg","f_wt_yg_lg_bk_bn_ngl.jpg","f_wt_yg_md_br_bn_ngl32.jpg","F_wt_yg_lg_rd_bu_ngl.jpg","F_hs_yg_lg_bk_bn_ngl.jpg"],
["f_wt_yg_lg_br_bn_ngl21.jpg","f_wt_yg_lg_br_bn_ngl22.jpg","f_wt_yg_lg_br_bn_ngl23.jpg","F_wt_yg_lg_br_bn_ngl5.jpg","f_wt_yg_md_br_bn_ngl27.jpg","f_wt_yg_lg_br_bu_ngl10.jpg"],
["f_wt_yg_md_bl_bu_ngl29.jpg","F_wt_yg_md_bl_gn_ngl.jpg","f_wt_yg_md_bl_bu_ngl28.jpg","f_wt_yg_md_bl_bu_ngl33.jpg","F_wt_yg_md_br_bu_ngl14.jpg","F_wt_yg_md_br_bu_ngl11.jpg"],
["f_wt_ma_lg_bl_bn_ngl.jpg","f_wt_yg_lg_bl_bu_ngl24.jpg","F_wt_yg_lg_bl_hz_ngl3.jpg","F_wt_yg_lg_bl_bu_ngl4.jpg","f_wt_yg_lg_bl_bu_ngl17.jpg","f_wt_ma_lg_bl_bu_ngl2.jpg"],
["F_wt_yg_lg_br_bu_ngl.jpg","f_wt_yg_md_bl_bu_ngl32.jpg","F_wt_yg_lg_br_bu_ngl3.jpg","F_wt_yg_lg_bl_bu_ngl9.jpg","F_wt_yg_lg_bl_bu_ngl8.jpg","f_wt_yg_lg_bl_hz_ngl9.jpg"],
["F_wt_yg_md_br_bn_ngl23.jpg","F_wt_yg_md_br_bn_ngl26.jpg","f_wt_yg_md_br_bn_ngl31.jpg","F_wt_yg_md_br_bn_ngl3.jpg","f_wt_yg_md_br_bu_ngl24.jpg","f_wt_yg_md_bk_bn_ngl.jpg"],
["F_wt_yg_md_br_bn_ngl18.jpg","F_wt_yg_md_br_bn_ngl24.jpg","F_wt_yg_md_br_bu_ngl2.jpg","F_wt_yg_md_br_bu_ngl3.jpg","F_wt_yg_md_br_bu_ngl15.jpg","F_wt_yg_md_br_bn_ngl8.jpg"],
["f_wt_yg_md_bl_bu_gl.jpg","F_wt_yg_md_bl_bu_ngl4.jpg","f_wt_yg_md_bl_bu_ngl19.jpg","F_wt_yg_md_bl_bu_ngl21.jpg","f_wt_yg_md_bl_bu_ngl27.jpg","f_wt_yg_md_br_bu_ngl23.jpg"],
["F_wt_yg_lg_br_bn_ngl19.jpg","f_wt_yg_lg_br_bn_ngl30.jpg","F_wt_yg_lg_br_bn_ngl.jpg","f_wt_yg_lg_br_bn_ngl26.jpg","f_wt_yg_lg_bl_bn_ngl5.jpg","F_wt_yg_md_br_gn_ngl3.jpg"],
["F_wt_yg_md_br_bn_ngl6.jpg","f_wt_yg_md_br_bn_ngl33.jpg","F_wt_yg_md_br_bu_ngl9.jpg","f_wt_yg_md_br_bn_ngl30.jpg","f_wt_yg_md_bk_bn_gl.jpg","f_wt_yg_lg_br_gn_ngl4.jpg"],
["F_wt_yg_st_bl_bn_ngl.jpg","f_wt_yg_st_bl_bn_ngl2.jpg","f_wt_yg_st_bl_bn_ngl3.jpg","F_wt_yg_st_bl_bu_ngl3.jpg","F_wt_yg_md_bl_bu_ngl24.jpg","f_wt_yg_st_bl_hz_ng.jpg"],
["F_wt_yg_md_rd_bn_ngl3.jpg","F_wt_yg_md_rd_bu_ngl.jpg","f_wt_yg_st_bl_bu_ngl4.jpg","f_wt_yg_st_bl_bu_ngl6.jpg","f_wt_yg_md_bl_bu_ngl35.jpg","F_wt_yg_md_br_bu_ngl4.jpg"],
["f_wt_yg_st_br_bn_ngl6.jpg","F_wt_yg_st_br_bn_ngl.jpg","F_wt_yg_st_br_bn_ngl4.jpg","F_wt_yg_st_br_bu_ngl.jpg","F_wt_yg_st_br_bu_ngl2.jpg","F_wt_yg_md_br_bu_ngl13.jpg"],
["F_wt_yg_md_br_bu_ngl.jpg","F_wt_yg_md_br_bu_ngl5.jpg","F_wt_yg_md_br_bu_ngl6.jpg","F_wt_yg_md_br_bu_ngl8.jpg","F_wt_yg_md_br_bu_ngl10.jpg","f_wt_yg_md_br_bu_ngl17.jpg"],
["F_wt_yg_md_br_bu_ngl7.jpg","F_wt_yg_md_br_bu_ngl12.jpg","F_wt_yg_md_br_bu_ngl16.jpg","f_wt_yg_md_br_bu_ngl18.jpg","f_wt_yg_md_br_bu_ngl21.jpg","f_wt_yg_md_br_bu_ngl25.jpg"],
["F_wt_yg_md_bl_bu_ngl6.jpg","F_wt_yg_md_bl_bu_ngl12.jpg","f_wt_yg_md_bl_bu_ngl31.jpg","f_wt_yg_md_bl_bu_ngl30.jpg","f_wt_yg_lg_bl_bu_ngl32.jpg","F_wt_yg_lg_bl_gn_ngl.jpg"],
["F_wt_yg_md_br_hz_ngl2.jpg","f_wt_yg_md_br_bu_ngl22.jpg","F_wt_yg_md_br_gn_ngl2.jpg","f_wt_yg_lg_br_bu_ngl9.jpg","F_wt_yg_lg_br_hz_ngl3.jpg","f_wt_yg_lg_br_bu_ngl16.jpg"],
["f_wt_yg_lg_br_bn_ngl14.jpg","f_wt_yg_lg_br_bn_ngl15.jpg","f_wt_yg_lg_br_bn_ngl18.jpg","f_wt_yg_lg_br_bn_ngl27.jpg","f_wt_yg_lg_br_bn_ngl24.jpg","F_wt_yg_lg_br_bn_ngl10.jpg"],
["M_wt_yg_md_bl_bn_ngl_gt.jpg","M_wt_yg_st_bl_bu_ngl_sh.jpg","M_wt_yg_st_bl_bu_ngl_sh4.jpg","m_wt_yg_st_bl_bu_ngl_sh11.jpg","M_wt_yg_md_br_bu_ngl_sh4.jpg","M_wt_yg_md_br_bn_ngl_sh8.jpg"],
["M_wt_yg_st_bl_gr_ngl_sh.jpg","M_wt_yg_st_bl_bu_ngl_sh2.jpg","M_wt_yg_st_bl_bu_ngl_sh8.jpg","M_wt_yg_st_bl_bu_ngl_sh13.jpg","m_wt_yg_st_bl_bu_ngl_sh19.jpg","M_wt_yg_st_bl_bu_ngl_sh6.jpg"],
["M_wt_yg_md_bk_bn_gl_bd.jpg","m_wt_yg_md_bk_hz_gl_sd.jpg","m_wt_yg_st_br_bu_gl_bd.jpg","M_wt_yg_st_br_bn_gl_gt.jpg","M_wt_yg_st_bn_hz_ngl_gt.jpg","M_wt_yg_md_br_bn_ngl_gt2.jpg"],
["M_wt_yg_st_br_bn_ngl_sh17.jpg","M_wt_yg_st_br_bn_ngl_sh18.jpg","M_wt_yg_st_br_bn_ngl_sh19.jpg","M_wt_yg_st_br_bn_ngl_sh15.jpg","M_wt_yg_st_br_bn_ngl_sh.jpg","m_wt_yg_st_br_bn_ngl_sh20.jpg"],
["m_wt_yg_st_br_hz_ngl_sh8.jpg","M_wt_yg_md_br_bn_ngl_sh9.jpg","M_wt_yg_st_br_bn_ngl_sh2.jpg","M_wt_yg_md_br_bn_ngl_sh2.jpg","M_wt_yg_md_br_bu_ngl_sh2.jpg","M_wt_yg_md_br_bu_ngl_sh6.jpg"],
["M_wt_yg_md_bl_bu_ngl_sh.jpg","m_wt_yg_st_bl_bu_ngl_sh15.jpg","M_wt_yg_st_bl_bu_ngl_sh7.jpg","M_wt_yg_st_bl_bu_ngl_sh3.jpg","m_wt_yg_st_br_bu_ngl_sh19.jpg","M_wt_yg_md_br_hz_ngl_sh3.jpg"],
["M_wt_yg_st_bl_bu_ngl_gt.jpg","M_wt_yg_md_bl_bu_ngl_bd.jpg","M_wt_yg_md_bl_bu_ngl_sh2.jpg","m_wt_yg_st_bl_bu_ngl_sh16.jpg","m_wt_yg_st_br_bl_ngl_gt.jpg","M_wt_yg_st_br_bu_ngl_sh2.jpg"],
["M_wt_yg_st_br_bn_ngl_sh5.jpg","M_wt_yg_st_br_bn_ngl_sh6.jpg","M_wt_yg_st_br_gn_ngl_sh2.jpg","M_wt_yg_st_br_bn_ngl_sh14.jpg","m_wt_yg_st_br_bu_ngl_sh18.jpg","M_wt_yg_md_br_bn_ngl_sh.jpg"],
["M_wt_yg_st_br_hz_ngl_sh4.jpg","m_wt_yg_st_br_gn_ngl_sh4.jpg","M_wt_yg_st_br_hz_gl_sh.jpg","m_wt_yg_st_br_bn_ngl_sh31.jpg","M_wt_yg_st_br_bn_ngl_sh4.jpg","M_wt_yg_md_br_bn_ngl_sh6.jpg"],
["M_wt_yg_st_br_bn_ngl_sh16.jpg","m_wt_yg_st_br_bn_ngl_sh22.jpg","m_wt_yg_st_br_bn_ngl_sh28.jpg","m_wt_yg_st_br_bn_ngl_sh33.jpg","m_wt_yg_st_br_bn_ngl_sd3.jpg","M_wt_yg_st_br_bn_ngl_sh9.jpg"],
["M_wt_yg_st_br_gr_ngl_gt.jpg","M_wt_yg_st_br_hz_ngl_sh6.jpg","M_wt_yg_st_br_hz_ngl_sh5.jpg","m_wt_yg_st_br_bu_gl_sh4.jpg","m_wt_yg_st_br_bu_gl_sh3.jpg","M_wt_yg_st_br_bn_ngl_bd.jpg"],
["M_wt_yg_st_br_bu_ngl_sh8.jpg","m_wt_yg_st_br_gn_ngl_sh3.jpg","m_wt_yg_st_br_bu_ngl_sh17.jpg","m_wt_yg_st_br_bu_ngl_sh15.jpg","M_wt_yg_st_br_hz_ngl_sh2.jpg","M_wt_yg_st_br_bu_ngl_sh9.jpg"],
["M_hs_yg_md_br_bn_ngl_sh.jpg","m_wt_yg_md_bk_bn_ngl_sh555.jpg","m_wt_yg_md_bl_bn_ngl_sh2.jpg","m_wt_yg_md_br_bu_ngl_sd.jpg","M_wt_yg_md_br_bn_ngl_sh11.jpg","M_wt_yg_md_br_bu_ngl_sh3.jpg"],
["M_wt_yg_st_bl_bu_ngl_sh5.jpg","m_wt_yg_st_br_bu_ngl_sh14.jpg","M_wt_yg_st_br_gn_ngl_sh.jpg","m_wt_yg_st_bl_bu_ngl_sh18.jpg","M_wt_yg_md_bl_bu_ngl_sh3.jpg","m_wt_yg_md_bl_bu_ngl_sh6.jpg"],
["m_wt_yg_st_bk_bn_ngl_sd.jpg","m_wt_yg_st_bk_bn_ngl_sd2.jpg","m_wt_yg_st_bk_bn_ngl_sd3.jpg","m_wt_yg_st_bk_bn_ngl_sh.jpg","m_wt_yg_st_bk_bn_ngl_sh5.jpg","m_wt_yg_st_bk_bn_ngl_sh6.jpg"],
["m_wt_yg_md_br_bu_ngl_sh10.jpg","M_wt_yg_md_br_hz_ngl_sh5.jpg","m_wt_yg_md_rd_bl_ngl_sh3.jpg","m_wt_yg_st_bl_bu_ngl_sh17.jpg","m_wt_yg_md_bl_bu_ngl_sh111.jpg","m_wt_yg_md_br_bu_ngl_sh9.jpg"],
["M_wt_yg_st_br_bu_ngl_sh12.jpg","M_wt_yg_st_br_bu_ngl_sh3.jpg","M_wt_yg_st_br_bu_ngl_sh.jpg","M_wt_yg_md_br_bu_ngl_sh7.jpg","M_wt_yg_md_br_bu_ngl_sh.jpg","M_wt_yg_st_br_bu_ngl_sh5.jpg"],
["m_wt_yg_st_bk_bn_ngl_sh2.jpg","m_wt_yg_st_bk_bn_ngl_sh7.jpg","m_wt_yg_st_bk_bn_ngl_sh9.jpg","m_wt_yg_st_bk_bn_ngl_sh10.jpg","m_wt_yg_st_bk_bn_ngl_sh11.jpg","m_wt_yg_st_bk_bu_ngl_sh3.jpg"],
["M_wt_yg_md_br_bn_ngl_gt.jpg","m_wt_yg_md_br_bn_ngl_gt3.jpg","M_wt_yg_md_br_bn_ngl_sh12.jpg","m_wt_yg_st_bk_bn_ngl_sh3.jpg","m_wt_yg_st_bk_bn_ngl_sh8.jpg","m_wt_yg_st_br_bn_ngl_sh27.jpg"],
["M_wt_yg_md_br_bn_ngl_sh3.jpg","M_wt_yg_md_br_bu_ngl_sh8.jpg","M_wt_yg_st_br_bn_ngl_sh11.jpg","m_wt_yg_st_br_bn_ngl_sh23.jpg","m_wt_yg_st_br_bn_ngl_sh32.jpg","m_wt_yg_st_br_bu_ngl_sh13.jpg"],
["F_wt_yg_lg_br_gn_ngl2.jpg","f_wt_yg_lg_br_gn_ngl3.jpg","F_wt_yg_lg_br_hz_ngl2.jpg","F_wt_yg_lg_br_hz_ngl4.jpg","f_wt_yg_lg_br_hz_ngl5.jpg","F_wt_yg_lg_br_bn_ngl2.jpg"],
["F_wt_yg_md_bl_bn_ngl2.jpg","F_wt_yg_md_bl_bu_ngl2.jpg","F_wt_yg_md_bl_bu_ngl3.jpg","F_wt_yg_md_bl_bu_ngl5.jpg","f_wt_yg_md_bl_bu_ngl23.jpg","f_wt_yg_md_bl_bu_ngl34.jpg"],
["F_wt_yg_md_bl_hz_ngl.jpg","f_wt_yg_md_bl_hz_ngl3.jpg","F_wt_yg_md_br_bn_ngl2.jpg","F_wt_yg_md_br_gn_ngl.jpg","F_wt_yg_st_br_bn_ngl5.jpg","f_wt_yg_st_br_bn_ngl7.jpg"],
["F_as_yg_md_bk_bn_ngl.jpg","f_as_yg_md_bk_bn_ngl2.jpg","f_as_yg_md_bk_bn_ngl5.jpg","f_as_yg_md_bk_bn_ngl6.jpg","f_as_yg_lg_br_bn_ngl2.jpg","f_as_yg_st_bk_bn_ngl.jpg"],
["f_wt_yg_md_br_bu_ngl20.jpg","F_wt_yg_md_br_bn_ngl5.jpg","f_wt_yg_md_br_bn_ngl114.jpg","f_wt_yg_md_br_gn_ngl4.jpg","f_wt_yg_md_br_gn_ngl5.jpg","F_wt_yg_lg_br_bn_ngl6.jpg"],
["f_wt_yg_md_bk_bn_ngl2.jpg","f_wt_yg_md_bk_bn_ngl3.jpg","f_wt_yg_md_bk_gn_ngl.jpg","F_wt_yg_md_br_bn_ngl15.jpg","F_wt_yg_st_br_bu_ngl3.jpg","F_wt_yg_md_br_bn_ngl25.jpg"],
["F_wt_yg_st_br_bn_gl2.jpg","F_wt_yg_md_br_bn_ngl.jpg","F_wt_yg_md_br_bn_ngl7.jpg","f_wt_ma_md_bl_bu_ngl.jpg","F_wt_yg_md_rd_bu_ngl2.jpg","f_wt_yg_md_br_bn_ngl35.jpg"],
["F_wt_yg_lg_br_bn_ngl7.jpg","F_wt_yg_lg_br_bn_ngl12.jpg","f_wt_yg_lg_br_bn_ngl25.jpg","F_wt_yg_md_br_bn_ngl4.jpg","F_wt_yg_md_br_bn_ngl17.jpg","F_wt_yg_md_br_bn_ngl21.jpg"],
["f_wt_yg_md_rd_hz_ngl2.jpg","F_wt_yg_md_rd_bn_ngl2.jpg","F_wt_yg_st_bl_bu_ngl.jpg","F_wt_yg_md_rd_bn_ngl.jpg","f_wt_yg_md_br_bu_ngl19.jpg","f_wt_yg_md_rd_hz_ngl.jpg"],
["F_wt_yg_lg_bl_bu_ngl11.jpg","F_wt_yg_lg_bl_hz_ngl2.jpg","F_wt_yg_md_bl_bn_ngl4.jpg","F_wt_yg_md_bl_bu_ngl7.jpg","F_wt_yg_md_br_bn_ngl20.jpg","F_wt_yg_md_bl_bu_ngl8.jpg"],
["F_wt_yg_md_br_bn_ngl9.jpg","F_wt_yg_md_br_bn_ngl14.jpg","f_wt_yg_md_br_bn_ngl34.jpg","f_wt_yg_md_br_bn_ngl36.jpg","f_wt_yg_md_br_bu_ngl26.jpg","f_wt_yg_st_bk_bn_ngl.jpg"],
["F_wt_yg_lg_rd_bn_ngl.jpg","F_wt_yg_lg_br_bu_ngl6.jpg","f_wt_yg_lg_br_bu_ngl11.jpg","f_wt_yg_lg_br_bn_ngl20.jpg","f_wt_yg_md_rd_bu_ngl3.jpg","F_wt_yg_md_br_bn_ngl19.jpg"],
["M_wt_yg_md_bl_bu_gl_sh.jpg","M_wt_yg_md_bl_bu_gl_sh2.jpg","M_wt_yg_md_bl_bu_ngl_sh4.jpg","M_wt_yg_md_rd_bn_ngl_sh.jpg","M_wt_yg_st_bl_bu_ngl_sh9.jpg","m_wt_yg_st_bl_bu_ngl_sh10.jpg"],
["M_wt_yg_md_br_bu_ngl_sh5.jpg","m_wt_yg_st_bk_bu_ngl_sh2.jpg","m_wt_yg_st_br_bu_ngl_gt4.jpg","M_wt_yg_st_br_bu_ngl_sd.jpg","M_wt_yg_st_br_bu_ngl_sd2.jpg","M_wt_yg_st_br_bu_ngl_sh7.jpg"],
["M_wt_yg_md_br_hz_ngl_gt.jpg","M_wt_yg_md_br_bn_ngl_sh10.jpg","m_wt_yg_st_bn_bu_ngl_sh.jpg","M_wt_yg_md_br_hz_ngl_sh.jpg","m_wt_yg_st_bl_bu_ngl_sh12.jpg","M_wt_yg_st_bl_bu_ngl_sd.jpg"],
["M_wt_yg_st_br_bu_ngl_sh11.jpg","m_wt_yg_st_br_bu_ngl_sh16.jpg","M_wt_yg_st_br_bn_ngl_sh3.jpg","M_wt_yg_st_br_bn_ngl_sh10.jpg","M_wt_yg_st_br_bu_ngl_sh4.jpg","M_wt_yg_md_br_hz_ngl_sh2.jpg"],
["m_wt_yg_st_bl_bn_gl_ms.jpg","M_wt_yg_st_bl_bn_gl_sh.jpg","m_wt_yg_st_bk_bn_gl_sd.jpg","m_wt_yg_st_br_bn_gl_sh5.jpg","m_wt_yg_st_br_bn_gl_sh6.jpg","m_wt_yg_st_br_bn_gl_sh7.jpg"],
["M_wt_yg_md_br_gn_ngl_sh.jpg","m_wt_yg_st_bk_bn_ngl_sh14.jpg","M_wt_yg_st_br_bn_ngl_sh12.jpg","M_wt_yg_st_br_bn_ngl_sh13.jpg","m_wt_yg_st_br_bn_ngl_sh26.jpg","M_wt_yg_md_br_bn_ngl_sh5.jpg"],
["f_wt_yg_lg_bl_hz_ngl4.jpg","F_wt_yg_lg_br_bn_gl.jpg","F_wt_yg_lg_br_bn_gl2.jpg","F_wt_yg_lg_br_bn_gl3.jpg","f_wt_yg_lg_bl_bu_ngl21.jpg","f_wt_yg_lg_bl_hz_ngl5.jpg"],
["F_wt_yg_md_bl_bn_ngl3.jpg","F_wt_yg_md_bl_bn_ngl6.jpg","f_wt_yg_md_bl_gn_ngl2.jpg","F_wt_yg_md_br_bn_ngl12.jpg","f_wt_yg_md_rd_bu_ngl4.jpg","F_wt_yg_md_br_bn_ngl10.jpg"],
["F_wt_yg_md_br_hz_ngl.jpg","f_wt_yg_st_bl_bu_ngl5.jpg","F_wt_yg_st_br_bu_ngl4.jpg","f_wt_yg_md_bl_hz_gl.jpg","F_wt_yg_lg_bl_bu_ngl15.jpg","F_wt_yg_lg_bl_bn_ngl7.jpg"],
["f_wt_yg_lg_br_bn_ngl28.jpg","f_wt_yg_lg_br_bn_ngl29.jpg","f_wt_yg_lg_br_bu_ngl12.jpg","F_wt_yg_md_br_hz_gl.jpg","F_wt_yg_lg_br_bn_ngl11.jpg","f_wt_yg_md_br_bn_ngl29.jpg"],
["f_wt_yg_lg_br_bu_gl.jpg","f_wt_yg_lg_br_bu_ngl14.jpg","f_wt_yg_lg_bl_bu_ngl20.jpg","f_wt_yg_md_br_bn_gl3.jpg","f_wt_yg_md_br_bn_ngl37.jpg","F_wt_yg_md_br_bn_ngl16.jpg"]
];
